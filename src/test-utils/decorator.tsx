import "@/index.css";
import Provider from "@/components/Provider";
import { ActiveContext } from "@/context/ActiveContext";
import { ToolTipContext } from "@/context/ToolTipContext";
import type { Decorator } from "@storybook/react-vite";
import { HighlightContext } from "@/context/HighlightContext";
import { ModelProvider } from "@/context/ModelContext";

export const withMockContext: Decorator = (Story) => {
  return (
    <ToolTipContext.Provider
      value={{
        setRegistry: () => {},
        registry: { hello: { description: "Hello wrld" } },
      }}
    >
      <ActiveContext.Provider
        value={{
          active: null,
          setActive: () => {},
          activateHotKey: "alt+h",
        }}
      >
        <HighlightContext.Provider
          value={{ highlighted: {}, setHighlighted: () => {} }}
        >
          <ModelProvider>
            <Story />
          </ModelProvider>
        </HighlightContext.Provider>
      </ActiveContext.Provider>
    </ToolTipContext.Provider>
  );
};

export const withRealContext: Decorator = (Story) => {
  return (
    <Provider>
      <Story />
    </Provider>
  );
};
