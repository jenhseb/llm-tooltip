import { ToolLLM } from "@/types";
import { ToolDescriptionLLM, ToolLLMFuncs } from "@/types";

export const SYSTEM_MESSAGE = `
You are a helpful assistant to guide users through navigating an unfamiliar website. 

You can learn everything you need to know about items on the screen by their descriptions. 

DO NOT tell about users about the descriptions. They do not have access. 

Use your knowledge to return a list of guidance tips for the user to answer their question CONCISELY.

For each tip, include the item on the screen that the tip is pertaining to.

For example, to guide the user to click on "item-1", return:
[
  {"help": "Click this to cancel your current subscription. ", "item_id": 1}
]
`;

const TOOL_DETAILS: Record<ToolLLM, ToolDescriptionLLM> = {
  [ToolLLM.ListAvailable]: {
    name: "list_rendered_items",
    description:
      "List all of the items that are currently rendered on the user's screen (e.g. buttons, fields).",
  },
  [ToolLLM.GetActive]: {
    name: "get_active_item",
    description:
      "Gets a info about the item on the screen that the user is currently pointing at or is referring to.",
  },
};

export const DEFAULTS = {
  toolDetails: TOOL_DETAILS,
  system: SYSTEM_MESSAGE,
  rejectUserMessage:
    "This does not look like something I can help with. Please stick to questions about what is on the screen.",
};
