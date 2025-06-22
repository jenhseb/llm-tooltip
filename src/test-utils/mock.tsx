import { AskLLM } from "@/llm/chat";

export const askLLMMockDummyAnswer: AskLLM = async (params) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const currentDate = new Date();
  return [
    {
      help:
        "It is " +
        currentDate.toLocaleString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      item: null,
    },
  ];
};
