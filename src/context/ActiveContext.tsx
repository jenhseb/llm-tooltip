import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useCallback,
} from "react";
import { ToolTipId } from "@/types";

interface ActiveContextType {
  active: ToolTipId | null;
  setActive: React.Dispatch<React.SetStateAction<ToolTipId | null>>;
  activateHotKey: string;
}

export const ActiveContext = createContext<ActiveContextType | undefined>(
  undefined,
);

interface ActiveProviderProps {
  activateHotKey: string;
}
export const ActiveProvider = ({
  children,
  activateHotKey = "alt+h",
}: PropsWithChildren<ActiveProviderProps>) => {
  const [active, setActive] = useState<ToolTipId | null>(null);
  return (
    <ActiveContext.Provider value={{ active, setActive, activateHotKey }}>
      {children}
    </ActiveContext.Provider>
  );
};

export const useActiveContext = (): ActiveContextType => {
  const context = useContext(ActiveContext);
  if (!context) {
    throw new Error("useActive must be used within an ActiveProvider");
  }
  return context;
};

export const useActive = (toolTipId?: ToolTipId) => {
  const { active, setActive, activateHotKey } = useActiveContext();

  const deactivate = useCallback(() => {
    if (!toolTipId) {
      throw new Error("should not be able to be called without a toolTipId");
    }
    setActive((active) => (active == toolTipId ? null : active));
  }, [setActive]);

  const activate = useCallback(() => {
    if (!toolTipId) {
      throw new Error("should not be able to be called without a toolTipId");
    }
    setActive(toolTipId);
  }, [setActive]);

  const isActive = toolTipId ? active === toolTipId : false;
  return {
    active,
    activate: toolTipId ? activate : undefined,
    deactivate: toolTipId ? deactivate : undefined,
    isActive,
    activateHotKey,
  };
};
