import type { Meta, StoryObj } from "@storybook/react-vite";
import HighlightToolTip from "./Higlight";
import { withRealContext } from "@/test-utils/decorator";
import { within } from "@storybook/test";

const meta: Meta<typeof HighlightToolTip> = {
  component: HighlightToolTip,
  title: "ToolTip/HighlightToolTip",
  decorators: [withRealContext],
  play: async ({ canvasElement, userEvent }) => {
    const trigger = within(canvasElement).getByTestId("trigger");
    await userEvent.hover(trigger);
    // await userEvent.keyboard("{Alt>}h{/Alt}");
  },
};

export default meta;
type Story = StoryObj<typeof HighlightToolTip>;

export const ToolTipWithHover: Story = {
  args: {
    children: (
      <div className="w-1/2 bg-green-400" data-testid="trigger">
        Square 4
      </div>
    ),
    highlightInfo: { color: "red" },
  },
  play: async ({ canvasElement, userEvent }) => {
    const trigger = within(canvasElement).getByTestId("trigger");
    await userEvent.hover(trigger);
  },
  render: (args) => {
    return (
      <div className="flex h-100 w-200 flex-1 flex-row flex-wrap bg-black">
        <div className="w-1/2 bg-red-400">Square 1</div>
        <div className="w-1/2 bg-blue-400">Square 2</div>

        <div className="w-1/2 bg-pink-400">Square 3</div>
        <HighlightToolTip {...args} />
      </div>
    );
  },
};

export const ToolTipWithHoverWhiteBackground: Story = {
  args: {
    children: (
      <div className="h-50 w-50 bg-green-400" data-testid="trigger">
        Square 4
      </div>
    ),
    highlightInfo: { color: "red" },
  },
  play: async ({ canvasElement, userEvent }) => {
    const trigger = within(canvasElement).getByTestId("trigger");
    await userEvent.hover(trigger);
  },
  render: (args) => {
    return (
      <div className="flex h-100 w-200 flex-1 flex-row flex-wrap items-center justify-center bg-white">
        <HighlightToolTip {...args} />
      </div>
    );
  },
};
