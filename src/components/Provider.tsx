import { FC, PropsWithChildren } from "react";
import { ActiveProvider } from "../context/ActiveContext";
import { ToolTipProvider } from "../context/ToolTipContext";
import { HighlightProvider } from "../context/HighlightContext";
import { ModelProvider } from "@/context/ModelContext";
import { type ModelParams } from "@/llm";

type ProviderProps = {
  activateHotKey?: string;
} & ModelParams;

const Provider: FC<PropsWithChildren<ProviderProps>> = ({
  children,
  activateHotKey = "alt+h",
  ...modelParams
}: PropsWithChildren<ProviderProps>) => {
  return (
    <ActiveProvider activateHotKey={activateHotKey}>
      <HighlightProvider>
        <ToolTipProvider>
          <ModelProvider {...modelParams}>{children}</ModelProvider>
        </ToolTipProvider>
      </HighlightProvider>
    </ActiveProvider>
  );
};

export default Provider;
