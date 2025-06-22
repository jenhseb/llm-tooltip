import { useActiveContext } from "@/context/ActiveContext";
import { useToolTipInfo } from "@/context/ToolTipContext";
import { useCallback } from "react";
import { ToolLLMFuncs, ToolLLM } from "@/types";

const useToolsLLM = (): {
  listAvailable: ToolLLMFuncs[ToolLLM.ListAvailable];
  getActive: ToolLLMFuncs[ToolLLM.GetActive];
} => {
  const { active } = useActiveContext();
  const { getToolTipInfo, listToolTipInfo } = useToolTipInfo();

  const getActive: ToolLLMFuncs[ToolLLM.GetActive] = useCallback(
    () =>
      active
        ? {
            item: active,
            description: getToolTipInfo(active).description,
          }
        : null,
    [active, getToolTipInfo],
  );

  const listAvailable: ToolLLMFuncs[ToolLLM.ListAvailable] = useCallback(() => {
    return Object.entries(listToolTipInfo()).map(([id, info]) => ({
      item: id,
      description: info.description,
    }));
  }, []);

  return { getActive, listAvailable };
};
export default useToolsLLM;
