// MessageInput.stories.jsx
import { AskLLM } from "@/llm/chat";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Provider from "@/components/Provider";
import { SmartToolTip } from "@/index";
import { within } from "@storybook/test";
import { useState } from "react";
import { withRealContext } from "@/test-utils/decorator";
import { sleep } from "@/utils";
import { TOOLTIP_DELAY } from "@/constants";

const meta: Meta<{}> = {
  title: "Screens/AskAboutActiveStories",
  parameters: {
    layout: "centered",
  },
  decorators: [withRealContext],
  play: async ({ canvasElement, userEvent }) => {
    await userEvent.hover(within(canvasElement).getByTestId("trigger"));
    await sleep(TOOLTIP_DELAY + 200);

    await userEvent.keyboard("{Alt>}h{/Alt}");

    const screen = canvasElement.parentElement;
    if (!screen) {
      throw Error("Screen element not found");
    }
    await userEvent.type(
      within(screen).getByTestId("message-input-textarea"),
      "What does this do?",
    );
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

const askLLMButtonMock: AskLLM = async (params) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      help: "Click this to learn how to compliment a really helpful AI",
      item: null,
    },
  ];
};

export const RealLLM: Story = {
  render: () => {
    const [showAlert, setShowAlert] = useState(false);
    const onClick = () => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    };
    return (
      <div className="flex h-100 w-100 flex-1 items-center justify-center bg-neutral-300">
        <SmartToolTip description="Tells you how to compliment a really helpful AI">
          <button
            className="btn btn-primary"
            onClick={onClick}
            data-testid="trigger"
          >
            Click me
          </button>
        </SmartToolTip>
        <div
          className={`alert alert-info fixed top-0 right-0 z-50 transition duration-1000 ${
            !showAlert ? "-translate-y-30" : ""
          }`}
        >
          <span>Tell them "You autocomplete me"</span>
        </div>
      </div>
    );
  },
};

export const MockLLM: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
  play: async (context) => {
    await meta.play?.(context);
    const submit = within(context.canvasElement.parentElement!).getByTestId(
      "message-input-submit",
    );
    await context.userEvent.click(submit);
  },
  render: RealLLM.render,
};
