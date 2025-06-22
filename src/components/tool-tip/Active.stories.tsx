import type { Meta, StoryObj } from "@storybook/react-vite";
import ActiveToolTip from "./Active";
import { NewWindow } from "@/components/chat/Window.stories";
import ChatWindow from "@/components/chat/Window";
import { withRealContext } from "@/test-utils/decorator";
import { askLLMMockDummyAnswer } from "@/test-utils/mock";

const meta: Meta<typeof ActiveToolTip> = {
  component: ActiveToolTip,
  title: "ToolTip/ActiveToolTip",
  decorators: [withRealContext],
};

export default meta;
type Story = StoryObj<typeof ActiveToolTip>;

const SimpleTip = () => {
  return (
    <div className="border-2 border-black bg-red-400 p-2">Activated Tip!</div>
  );
};

export const ToolTipWithSimpleMessage: Story = {
  args: {
    TipContent: SimpleTip,
    children: (
      <div className="w-1/2 bg-green-400" data-testid="trigger">
        Square 4
      </div>
    ),
  },
  render: (args) => {
    return (
      <div className="flex h-100 w-200 flex-1 flex-row flex-wrap bg-black">
        <div className="w-1/2 bg-red-400">Square 1</div>
        <div className="w-1/2 bg-blue-400">Square 2</div>

        <div className="w-1/2 bg-pink-400">Square 3</div>
        <ActiveToolTip {...args} />
      </div>
    );
  },
};

export const ToolTipWithChatWindow: Story = {
  args: {
    children: (
      <button className="btn btn-primary" data-testid="trigger">
        Click Me
      </button>
    ),
  },
  render: (args) => {
    return (
      <ActiveToolTip
        {...args}
        TipContent={() => (
          <ChatWindow {...NewWindow.args} askLLM={askLLMMockDummyAnswer} />
        )}
      />
    );
  },
};
