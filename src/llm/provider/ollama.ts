import { ToolLLM } from "@/types";
import { zodToJsonSchema } from "zod-to-json-schema";
import { LLMApiRequestError } from "@/errors";
import { AskLLM } from "../chat";
import ollama from "ollama/browser";

export const askLLM: AskLLM = async ({
  question,
  toolDetails,
  system,
  toolFns,
  model = "qwen3:8b-q4_K_M",
  rejectUserMessage,
  history,
  responseFormat,
}) => {
  const messages = [
    { role: "system", content: system },
    ...history,
    { role: "user", content: question },
  ];
  console.info(`Calling model ${model}`);
  let response = await ollama.chat({
    model,
    messages: messages,
    tools: Object.values(ToolLLM).map((toolType) => ({
      type: "function",
      function: {
        name: toolDetails[toolType as ToolLLM].name,
        description: toolDetails[toolType as ToolLLM].description,
        parameters: {},
      },
    })),
  });

  if (!response.message.tool_calls) {
    return [{ item: null, help: rejectUserMessage }];
  }
  if (response.message.tool_calls) {
    console.info(`Intermediate model output "${response.message.content}"`);
    // Process tool calls from the response
    for (const tool of response.message.tool_calls) {
      const toolType = Object.entries(toolDetails).find(
        ([_, toolDesc]) => toolDesc.name === tool.function.name,
      )?.[0] as ToolLLM;
      const functionToCall = toolFns[toolType];
      if (!functionToCall) {
        throw new LLMApiRequestError(
          `Failed call to tool "${tool.function.name}". Does not exist.`,
        );
      }
      const output = functionToCall();

      // Add the function response to messages for the model to use
      messages.push(response.message);
      messages.push({
        role: "tool",
        content: typeof output === "string" ? output : JSON.stringify(output),
      });
    }

    // Get final response from model with function outputs
    response = await ollama.chat({
      model,
      messages: messages,
      format: zodToJsonSchema(responseFormat),
    });
  }
  const out = response.message.content;
  console.info(`Final output ${out}`);

  try {
    const parsed = JSON.parse(out);
    return parsed.steps;
  } catch (error) {
    throw new LLMApiRequestError(`Failed to parse model output: ${error}`);
  }
};
