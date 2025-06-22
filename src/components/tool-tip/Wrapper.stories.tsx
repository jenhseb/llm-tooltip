import type { Meta, StoryObj } from "@storybook/react-vite";
import ToolTipWrapper from "./Wrapper";
import { NewWindow } from "@/components/chat/Window.stories";
import ChatWindow from "@/components/chat/Window";
import { withRealContext } from "@/test-utils/decorator";
import { askLLMMockDummyAnswer } from "@/test-utils/mock";
import ActiveToolTip, { ActiveToolTipProps } from "./Active";
import { sleep } from "@/utils";

const meta: Meta<typeof ToolTipWrapper> = {
  component: ToolTipWrapper,
  title: "ToolTip/ToolTipWrapper",
  decorators: [withRealContext],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ToolTipWrapper>;

const Active = (props: ActiveToolTipProps) => {
  return (
    <ActiveToolTip
      {...props}
      TipContent={() => {
        return (
          <ChatWindow
            askLLM={async () => {
              await sleep(500);
              return [
                {
                  item: null,
                  help: "Opens a greeting",
                },
              ];
            }}
          />
        );
      }}
    />
  );
};

export const Default: Story = {
  args: {
    Active: Active,
    description: "Click this button to open up a greeting.",
    children: (
      <button
        className="btn btn-primary"
        data-testid="trigger"
        onClick={() => {
          alert("Hello");
        }}
      >
        Click Me
      </button>
    ),
  },
};
