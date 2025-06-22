// MessageInput.stories.jsx
import MessageInput from "./MessageInput";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "@storybook/test";
const meta: Meta<typeof MessageInput> = {
  component: MessageInput,
  title: "Chat/MessageInput",
  args: {
    onSubmit: async (question: string) => {},
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyMessageInput: Story = {
  args: {},
};

export const ShortMessageInput: Story = {
  play: async ({ canvasElement, userEvent }) => {
    const input = await within(canvasElement).getByRole("textbox");
    await userEvent.type(input, "Hello, this is a test!");
  },
};

export const LongMesesageInput: Story = {
  play: async ({ canvasElement, userEvent }) => {
    const input = await within(canvasElement).getByRole("textbox");
    await userEvent.type(
      input,
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
    );
  },
};

export const SubmittingInput: Story = {
  args: {
    onSubmit: async (question: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
  play: async ({ canvasElement, userEvent }) => {
    const input = within(canvasElement).getByRole("textbox");
    const submit = within(canvasElement).getByRole("button");

    await userEvent.type(input, "Hello, this is a test!");
    await userEvent.click(submit);
  },
};

export const SubmittingInputError: Story = {
  args: {
    onSubmit: async (question: string) => {
      throw new Error("Error message");
    },
  },
  play: async ({ canvasElement, userEvent }) => {
    const input = within(canvasElement).getByRole("textbox");
    const submit = within(canvasElement).getByRole("button");

    await userEvent.type(input, "Hello, this is a test!");
    await userEvent.click(submit);
  },
};
