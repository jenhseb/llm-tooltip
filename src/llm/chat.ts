import { DEFAULTS as PROMPT_DEFAULTS } from "./prompt";
import { ToolLLM, type ToolDescriptionLLM, type ToolLLMFuncs } from "@/types";
import z from "zod";
import { SmartToolManagerError } from "@/errors";
import { DEFAULT_ASK_LLM } from "./provider";
export type AskAssistantReturn = z.infer<
  ReturnType<typeof getResponseStepsFormat>
>;

type AskLLMParams = (Required<Omit<AskAssistantParams, "model">> &
  Pick<AskAssistantParams, "model">) & {
  responseFormat: ReturnType<typeof getResponseFormat>;
};

export type AskLLM = (params: AskLLMParams) => Promise<AskAssistantReturn>;

type MessageLLM = {
  content: string;
  role: "user" | "assistant";
};
export interface ModelParams {
  // llm model (the llm function should provide a default when this is missing)
  model?: string;

  // enable overridign default prompts / messages
  rejectUserMessage?: string;
  system?: string;
  toolDetails?: Record<ToolLLM, ToolDescriptionLLM>;
  history?: MessageLLM[];

  askLLM?: AskLLM;
}

export interface AskAssistantParams extends ModelParams {
  // input from app
  question: string;
  toolFns: ToolLLMFuncs;
}
const getResponseStepsFormat = (availableItems: string[]) => {
  return z.array(
    z.object({
      help: z.string(),
      item: z.enum(availableItems as [string, ...string[]]).nullable(),
    }),
  );
};
const getResponseFormat = (availableItems: string[]) => {
  return z.object({
    steps: getResponseStepsFormat(availableItems),
  });
};

export const askAssistant = async ({
  question,
  toolDetails = PROMPT_DEFAULTS.toolDetails,
  system = PROMPT_DEFAULTS.system,
  rejectUserMessage = PROMPT_DEFAULTS.rejectUserMessage,
  toolFns,
  model,
  history = [],
  askLLM = DEFAULT_ASK_LLM,
}: AskAssistantParams): Promise<AskAssistantReturn> => {
  // get response format
  console.log("question", question);
  const availableItems: string[] = toolFns[ToolLLM.ListAvailable]().map(
    (available) => available.item,
  );
  if (availableItems.length == 0) {
    throw new SmartToolManagerError("No items listed as visible on screen");
  }
  const responseFormat = getResponseFormat(availableItems);
  const out = await askLLM({
    question,
    system,
    responseFormat,
    toolDetails,
    history,
    toolFns,
    rejectUserMessage,
    model,
  } as Required<AskLLMParams>);
  console.log("out", out);
  return out;
};
