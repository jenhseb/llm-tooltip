import type { Meta, StoryObj } from "@storybook/react-vite";
import MessageDisplay from "./MessageDisplay";

const meta: Meta<typeof MessageDisplay> = {
  component: MessageDisplay,
  title: "Chat/MessageDisplay",
};

export default meta;
type Story = StoryObj<typeof MessageDisplay>;

export const UserMessage: Story = {
  args: {
    msg: {
      id: "1",
      content: "What does this button do?",
      role: "user",
    },
  },
};

export const AssistantMessage: Story = {
  args: {
    msg: {
      id: "2",
      content: "Click this button to submit the form",
      role: "assistant",
    },
  },
};

export const UserMessageColor: Story = {
  args: {
    msg: {
      id: "3",
      content: "What does this button do?",
      role: "user",
    },
  },
};
