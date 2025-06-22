import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useCallback,
} from "react";

type ToolTipInfo = {
  description: string;
};
type ToolTipId = string;

interface ToolTipContextType {
  registry: Record<ToolTipId, ToolTipInfo>;
  setRegistry: React.Dispatch<
    React.SetStateAction<Record<ToolTipId, ToolTipInfo>>
  >;
}

export const ToolTipContext = createContext<ToolTipContextType | undefined>(
  undefined,
);

export const ToolTipProvider = ({ children }: PropsWithChildren) => {
  const [registry, setRegistry] = useState<Record<ToolTipId, ToolTipInfo>>({});

  return (
    <ToolTipContext.Provider value={{ registry, setRegistry }}>
      {children}
    </ToolTipContext.Provider>
  );
};

const useToolTipContext = (): ToolTipContextType => {
  const context = useContext(ToolTipContext);
  if (!context) {
    throw new Error("useToolTipContext must be used within an ToolTipProvider");
  }
  return context;
};

export const useToolTipInfo = () => {
  const { registry, setRegistry } = useToolTipContext();

  const getToolTipInfo = useCallback(
    (id: ToolTipId) => {
      return registry?.[id];
    },
    [registry],
  );

  const listToolTipInfo = useCallback(() => {
    return { ...registry };
  }, [registry]);

  const updateRegistry = useCallback(
    (id: ToolTipId, tooltipInfo: ToolTipInfo) => {
      setRegistry((prev: Record<ToolTipId, ToolTipInfo>) => ({
        ...prev,
        [id]: tooltipInfo,
      }));
    },
    [setRegistry],
  );

  const removeFromRegistry = useCallback(
    (id: ToolTipId) => {
      if (!(id in registry)) {
        return;
      }
      setRegistry((prev) => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
    },
    [registry, setRegistry],
  );

  return {
    getToolTipInfo,
    removeFromRegistry,
    updateRegistry,
    listToolTipInfo,
  };
};
