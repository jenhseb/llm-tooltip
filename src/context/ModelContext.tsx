import { createContext, PropsWithChildren, useContext } from "react";
import { type ModelParams } from "@/llm";

interface ModelContextType extends ModelParams {}

export const ModelContext = createContext<ModelContextType | undefined>(
  undefined,
);

export const ModelProvider = ({
  children,
  ...modelParams
}: PropsWithChildren<ModelContextType>) => {
  return (
    <ModelContext.Provider value={modelParams}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModelContext = (): ModelContextType => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModelContext must be used within a ModelProvider");
  }
  return context;
};

export const useGlobalModelParams = (): ModelParams => {
  const params = useModelContext();
  return params;
};
