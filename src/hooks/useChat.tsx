import { ToolLLM, type ChatMessage } from "@/types";
import { askAssistant } from "@/llm/chat";
import useToolsLLM from "./useToolsLLM";
import { type ModelParams } from "@/llm";
import { useGlobalModelParams } from "@/context/ModelContext";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

export type UseChatProps = ModelParams;

const getLastAssistantResponse = (messages: ChatMessage[]): ChatMessage[] => {
  if (messages.length === 0 || messages[messages.length - 1].role == "user") {
    return [];
  }

  const idx = (messages.findLastIndex((m) => m.role == "user") ?? -1) + 1;
  return messages.slice(idx);
};

const useChat = ({ ...localModelParams }: UseChatProps) => {
  const { getActive, listAvailable } = useToolsLLM();
  const globalModelParams = useGlobalModelParams();

  const { history, ...modelParams } = {
    ...globalModelParams,
    ...localModelParams,
  };

  // TODO - allow user to overwrite history via changing the props (after initial render)
  const [messages, setMessages] = useState<ChatMessage[]>(
    history?.map((msg) => ({ ...msg, id: uuid() })) ?? [],
  );

  const lastAssistantResponse = useMemo(
    () => getLastAssistantResponse(messages),
    [messages],
  );

  const ask = async (question: string) => {
    const answer = await askAssistant({
      ...modelParams,
      history: messages,
      question,
      toolFns: {
        [ToolLLM.ListAvailable]: listAvailable,
        [ToolLLM.GetActive]: getActive,
      },
    });

    const answerMessages: ChatMessage[] = answer.map((step) => ({
      toolTipId: step?.item || undefined,
      content: step.help,
      role: "assistant",
      id: uuid(),
    }));

    setMessages([
      ...messages,
      { role: "user", content: question, id: uuid() },
      ...answerMessages,
    ]);
  };
  return { ask, history: messages, latestResponse: lastAssistantResponse };
};
export default useChat;
