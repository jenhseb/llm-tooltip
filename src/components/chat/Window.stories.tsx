// MessageInput.stories.jsx
import { AskLLM } from "@/llm/chat";
import Window from "./Window";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "@storybook/test";
import { withMockContext } from "@/test-utils/decorator";
import { askLLMMockDummyAnswer } from "@/test-utils/mock";

const meta: Meta<typeof Window> = {
  component: Window,
  title: "Chat/Window",
  args: {
    askLLM: askLLMMockDummyAnswer,
  },
  decorators: [withMockContext],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const NewWindow: Story = {
  render: (args) => {
    return <Window {...args} />;
  },
};

export const WindowWithSendMessage: Story = {
  play: async ({ canvasElement, userEvent }) => {
    const input = within(canvasElement).getByRole("textbox");
    const submit = within(canvasElement).getByRole("button");

    await userEvent.type(input, "Hello, this is a test!");
    await userEvent.click(submit);
  },
  render: (args) => {
    return <Window {...args} />;
  },
};
