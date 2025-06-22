import { OpenAI } from "openai";
import { zodFunction, zodResponseFormat } from "openai/helpers/zod";
import z from "zod";
import { LLMApiRequestError, SmartToolManagerError } from "@/errors";
import { ToolLLM } from "@/types";
import { AskLLM } from "@/llm/chat";
import { IS_PROD } from "@/constants";

export const askLLM: AskLLM = async ({
  question,
  toolDetails,
  system,
  toolFns,
  model = "gpt-4o-mini",
  responseFormat,
  history,
}) => {
  const client = new OpenAI({ dangerouslyAllowBrowser: !IS_PROD });

  console.info(`Calling model ${model}`);
  const runner = client.chat.completions.runTools({
    model,
    messages: [
      { role: "system", content: system },
      ...history,
      { role: "user", content: question },
    ],
    stream: false,
    tools: Object.values(ToolLLM).map((toolType) =>
      zodFunction({
        function: toolFns[toolType as ToolLLM],
        name: toolDetails[toolType as ToolLLM].name,
        description: toolDetails[toolType as ToolLLM].description,
        parameters: z.object({}),
      }),
    ),
    response_format: zodResponseFormat(responseFormat, "instructions"),
  });
  const out = (await runner.finalChatCompletion()).choices[0].message.parsed
    ?.steps;
  if (out == null) {
    // TODO - see if you can add more details why it failed
    throw new LLMApiRequestError(
      `Failed to get a response to question ${question}`,
    );
  }
  console.info(`Final model output "${JSON.stringify(out, null, 2)}"`);
  return out;
};
