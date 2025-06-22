import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useCallback,
} from "react";
import { ToolTipId } from "@/types";
import { generateRandomColor } from "@/utils";
import { type ChatMessageId } from "@/types";
import { useActive } from "./ActiveContext";

interface HighlightInfo {
  color: string;
}

interface HighlightInfoInternal extends HighlightInfo {
  msgs: Set<ChatMessageId>;
}

export type HighlightInfoExternal = Partial<HighlightInfo> & {
  isHighlighted: boolean;
};

type Highlighted = {
  [toolTipId: string]: HighlightInfoInternal;
};

interface HighlightContextType {
  highlighted: Highlighted;
  setHighlighted: React.Dispatch<React.SetStateAction<Highlighted>>;
}

export const HighlightContext = createContext<HighlightContextType | undefined>(
  undefined,
);

export const HighlightProvider = ({ children }: PropsWithChildren) => {
  const [highlighted, setHighlighted] = useState<Highlighted>({});

  return (
    <HighlightContext.Provider value={{ highlighted, setHighlighted }}>
      {children}
    </HighlightContext.Provider>
  );
};

export const useHighlightContext = (): HighlightContextType => {
  const context = useContext(HighlightContext);
  if (!context) {
    throw new Error("useHighlight must be used within a HighlightProvider");
  }
  return context;
};

export const useHighlighted = (
  tooltipId?: ToolTipId,
): HighlightInfoExternal => {
  const { highlighted } = useHighlightContext();

  const isHighlighted = tooltipId && tooltipId in highlighted;
  if (!isHighlighted) {
    return { isHighlighted: false };
  }
  const { msgs, ...external } = highlighted[tooltipId];
  return { isHighlighted, ...external };
};

export const useSetHighlighted = (
  msgId: ChatMessageId,
  toolTipId?: ToolTipId,
) => {
  const { setHighlighted } = useHighlightContext();

  const addHighlight = useCallback(() => {
    if (toolTipId == null) {
      throw new Error("Shouldnt be able to call this when tooltipid is null");
    }
    setHighlighted((highlighted) => {
      const info = highlighted?.[toolTipId] ?? {
        color: generateRandomColor(),
        msgs: new Set<ChatMessageId>(),
      };
      info.msgs.add(msgId);
      return { ...highlighted, [toolTipId]: info };
    });
  }, [setHighlighted, toolTipId]);

  const removeHighlight = useCallback(() => {
    setHighlighted((highlighted) => {
      if (toolTipId == null) {
        throw new Error("Shouldnt be able to call this when tooltipid is null");
      }
      if (!(toolTipId in highlighted)) {
        return highlighted;
      }
      const newHighlighted = { ...highlighted };

      const info = newHighlighted[toolTipId];
      info.msgs.delete(msgId);

      if (info.msgs.size == 0) {
        delete newHighlighted[toolTipId];
      }

      return newHighlighted;
    });
  }, [setHighlighted]);

  return {
    removeHighlight: toolTipId ? removeHighlight : undefined,
    addHighlight: toolTipId ? addHighlight : undefined,
  };
};
