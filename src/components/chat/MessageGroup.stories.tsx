// MessageGroup.stories.jsx
import MessageGroup from "./MessageGroup";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "@storybook/test";
import { ChatMessage } from "@/types";

const meta: Meta<typeof MessageGroup> = {
  component: MessageGroup,
  title: "Chat/MessageGroup",
};
export default meta;
type Story = StoryObj<typeof meta>;

const DEFAULT_MESSAGES: ChatMessage[] = [
  { id: "1", content: "What does this button do", role: "user" },
  {
    id: "2",
    content: "This button is used for submitting the form.",
    role: "assistant",
  },
  { id: "3", content: "Where does the data get stored?", role: "user" },
  {
    id: "4",
    content: "We send it to the server",
    role: "assistant",
  },
  {
    id: "5",
    content: "e2e encrypted.",
    role: "assistant",
  },
];

export const HasConversation: Story = {
  args: { messages: DEFAULT_MESSAGES.slice(0, 2), hasInput: true },
};

export const SmallHeight: Story = {
  args: { messages: DEFAULT_MESSAGES.slice(0, 2), hasInput: true },
  decorators: [
    (Story) => (
      <div style={{ height: "150px", overflow: "hidden" }}>
        <Story />
      </div>
    ),
  ],
};

export const SmallWidth: Story = {
  args: { messages: DEFAULT_MESSAGES.slice(0, 2), hasInput: true },
  decorators: [
    (Story) => (
      <div style={{ width: "200px", height: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const HasLongConversation: Story = {
  args: { messages: DEFAULT_MESSAGES, hasInput: true },
};

export const NoMessages: Story = {
  args: { messages: [], hasInput: true },
};

export const HasConversationNoInput: Story = {
  args: { messages: DEFAULT_MESSAGES.slice(0, 2), hasInput: false },
};

export const OneMessage: Story = {
  args: { messages: DEFAULT_MESSAGES.slice(0, 1), hasInput: false },
};

export const HasConversationNoInputFilledInput: Story = {
  args: { messages: DEFAULT_MESSAGES.slice(0, 2), hasInput: true },
  play: async ({ canvasElement, userEvent }) => {
    const input = await within(canvasElement).getByRole("textbox");
    await userEvent.type(input, "Hello, this is a test!");
  },
};
