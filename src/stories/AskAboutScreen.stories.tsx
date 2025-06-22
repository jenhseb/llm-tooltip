import type { Meta, StoryObj } from "@storybook/react-vite";
import { AskLLM } from "@/llm/chat";
import Provider from "@/components/Provider";
import { SmartToolTip } from "@/index";
import { within } from "@storybook/test";
import { useState } from "react";
import { Clicked as ClickedPageHelp } from "@/components/PageHelp.stories";
import PageHelp from "@/components/PageHelp";
import { sleep } from "@/utils";
import { ToolLLM } from "@/types";

const meta: Meta<{}> = {
  title: "Screens/AskAboutScreen",
  parameters: { layout: "centered" },
  render: (args) => {
    const [background, setBackground] = useState("bg-neutral-300");
    return (
      <div
        className={`flex h-100 w-200 items-center justify-center gap-3 ${background}`}
      >
        <SmartToolTip description="Turn the background red">
          <button
            className="btn bg-green-500 p-3"
            onClick={() => setBackground("bg-red-300")}
          >
            Click Me!
          </button>
        </SmartToolTip>
        <SmartToolTip description="Turn the background blue">
          <button
            className="btn bg-red-500 p-3"
            onClick={() => setBackground("bg-blue-300")}
          >
            Click Me!
          </button>
        </SmartToolTip>
        <SmartToolTip description="Turn the background green">
          <button
            className="btn bg-blue-500 p-3"
            onClick={() => setBackground("bg-green-300")}
          >
            Click Me
          </button>
        </SmartToolTip>
        {<PageHelp />}
      </div>
    );
  },
  play: async (context) => {
    await ClickedPageHelp.play?.(context);

    const input = within(context.canvasElement.parentElement!).getByTestId(
      "message-input-textarea",
    );
    await context.userEvent.type(input, "How do I turn the screen blue?");
    await sleep(500);
  },
};
type Story = StoryObj<typeof meta>;

const askLLMButtonMock: AskLLM = async (params) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const button = params.toolFns[ToolLLM.ListAvailable]();
  const selected = button.find((e) =>
    e.description.toLowerCase().includes("blue"),
  );
  if (!selected) {
    throw Error("No button found");
  }
  return [
    {
      help: `Click this to turn the screen ${selected.description}`,
      item: selected.item,
    },
  ];
};

export const MockLLM: Story = {
  decorators: [
    (Story) => (
      <Provider askLLM={askLLMButtonMock}>
        <Story />
      </Provider>
    ),
  ],
  play: async (context) => {
    await meta.play?.(context);
    await context.userEvent.keyboard("{Meta>}{Enter}{/Meta}");
  },
};

export const RealLLM: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
