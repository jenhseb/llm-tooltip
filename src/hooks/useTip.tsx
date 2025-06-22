import { useCallback, useEffect, useRef, type PropsWithChildren } from "react";
import { useActiveContext } from "../context/ActiveContext";
import { ToolTipId } from "@/types";
import { useToolTipInfo } from "@/context/ToolTipContext";
import { useHighlighted } from "@/context/HighlightContext";
import { useActive } from "@/context/ActiveContext";

// TODO make this more robust to avoid collisions
let last_id = 1;
export const generateId = () => {
  // return Math.random().toString(36).substring(2) + Date.now().toString(36);
  last_id += 1;
  return "item-" + last_id;
};

export interface UseTipParams {
  description: string;
}

const useTip = (props: UseTipParams) => {
  // assign unique id to this
  const id = useRef<ToolTipId>(generateId()).current;

  const { isActive, activate, activateHotKey, deactivate } = useActive(id);
  const { updateRegistry, removeFromRegistry } = useToolTipInfo();
  const { isHighlighted, ...highlightInfo } = useHighlighted(id);
  // add / remove the tooltip to the global registry
  useEffect(() => {
    updateRegistry(id, { description: props.description });

    return () => removeFromRegistry(id);
  }, [props.description]);

  if (!activate || !deactivate) {
    throw new Error(
      "Activate and deactivate should be defined since id was passed into useActive",
    );
  }

  return {
    activate,
    deactivate,
    activateHotKey,
    isActive,
    isHighlighted,
    highlightInfo,
  };
};

export default useTip;
