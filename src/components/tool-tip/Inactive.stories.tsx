import type { Meta, StoryObj } from "@storybook/react-vite";
import InactiveToolTip from "./Inactive";
import { withRealContext } from "@/test-utils/decorator";
import { within } from "@storybook/test";

const meta: Meta<typeof InactiveToolTip> = {
  component: InactiveToolTip,
  title: "ToolTip/InactiveToolTip",
  decorators: [withRealContext],
  play: async ({ canvasElement, userEvent }) => {
    const trigger = within(canvasElement).getByTestId("trigger");
    await userEvent.hover(trigger);
    // await userEvent.keyboard("{Alt>}h{/Alt}");
  },
};

export default meta;
type Story = StoryObj<typeof InactiveToolTip>;

export const ToolTipWithHover: Story = {
  args: {
    children: (
      <div className="w-1/2 bg-green-400" data-testid="trigger">
        Square 4
      </div>
    ),
    activateHotKey: "alt+h",
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
        <InactiveToolTip {...args} />
      </div>
    );
  },
};

export const ToolTipWithHoverWhiteBackground: Story = {
  args: {
    children: (
      <button className="btn btn-primary" data-testid="trigger">
        Click Me
      </button>
    ),
    activateHotKey: "alt+h",
  },
  play: async ({ canvasElement, userEvent }) => {
    const trigger = within(canvasElement).getByTestId("trigger");
    await userEvent.hover(trigger);
  },
  render: (args) => {
    return (
      <div className="flex h-100 w-200 flex-1 flex-row flex-wrap items-center justify-center bg-white">
        <InactiveToolTip {...args} />
      </div>
    );
  },
};
