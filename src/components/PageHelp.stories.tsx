import type { Meta, StoryObj } from "@storybook/react-vite";
import PageHelp from "./PageHelp";
import { withMockContext, withRealContext } from "@/test-utils/decorator";
import { within } from "@storybook/test";
import { AskLLM } from "@/llm/chat";
import { askLLMMockDummyAnswer } from "@/test-utils/mock";
import { SmartToolTip } from "@/index";
import { ToolLLM } from "@/types";
import { sleep } from "@/utils";
const meta: Meta<typeof PageHelp> = {
  component: PageHelp,
  title: "Components/PageHelp",

  play: async ({ canvasElement, userEvent }) => {
    // const trigger = within(canvasElement).getByTestId("trigger");
    // await userEvent.hover(trigger);
    // await userEvent.keyboard("{Alt>}h{/Alt}");
  },
};

export default meta;
type Story = StoryObj<typeof PageHelp>;

export const Unclicked: Story = {
  args: {
    askLLM: askLLMMockDummyAnswer,
  },
  decorators: [withMockContext],
};

export const Clicked: Story = {
  args: {
    askLLM: askLLMMockDummyAnswer,
  },
  play: async ({ canvasElement, userEvent }) => {
    const button = within(canvasElement).getByTestId("page-help-button");
    await userEvent.click(button);
  },
  decorators: [withMockContext],
};

const askLLMReferencingItem: AskLLM = async ({ toolFns, question }) => {
  const available = toolFns[ToolLLM.ListAvailable]();

  let selected = null;
  console.log(question);
  if (!question.includes("start")) {
    selected = available.find((e) =>
      e.description.toLowerCase().includes("overstayed"),
    );
  } else {
    selected = available.find(
      (e) => !e.description.toLowerCase().includes("overstayed"),
    );
  }
  if (selected == null) {
    throw Error("Nothing was listed");
  }
  return [
    {
      help: `I'm pointing at item "${selected.description}"`,
      item: selected.item,
    },
  ];
};

export const ReferencingItemOnScreen: Story = {
  args: {
    askLLM: askLLMReferencingItem,
  },
  play: async ({ canvasElement, userEvent }) => {
    const button = within(canvasElement).getByRole("button");
    await userEvent.click(button);

    const input = within(canvasElement.parentElement!).getByTestId(
      "message-input-textarea",
    );
    await userEvent.type(input, "Where do I start?");
    await sleep(500);

    await userEvent.keyboard("{Meta>}{Enter}{/Meta}");

    await sleep(500);

    await userEvent.type(input, "Okay now what?");
    await sleep(500);

    await userEvent.keyboard("{Meta>}{Enter}{/Meta}");
  },
  render: (args) => {
    return (
      <div className="relative flex h-screen flex-1 flex-row items-center justify-center gap-3 bg-neutral-300">
        <PageHelp {...args} />
        <SmartToolTip description="Welcome text">
          <div className="bg-red-400 p-3">Hello world</div>
        </SmartToolTip>

        <SmartToolTip description="Overstayed welcome text">
          <div className="bg-purple-400 p-3">Screw the World</div>
        </SmartToolTip>
      </div>
    );
  },
  decorators: [withRealContext],
};
