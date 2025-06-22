import { describe, expect, it } from "@jest/globals";
import { askAssistant, AskLLM, type AskAssistantReturn } from "./chat";
import { ToolLLM, type ToolLLMFuncs } from "@/types";
import { askOllama } from "./provider";

//TODO: Add more tests
describe("Testing ask assistant function", () => {
  async function runAsk(
    askLLM: AskLLM,
    question: string,
    toolFns: ToolLLMFuncs,
  ): Promise<AskAssistantReturn> {
    const res = await askAssistant({
      question,
      askLLM,
      toolFns,
    });
    return res;
  }
  function mockFormScene(): ToolLLMFuncs {
    const getActive = jest.fn(() => ({
      description: "A text field for entering home country",
      item: "item-1",
    }));
    const ListAvailable = jest.fn(() => [
      { item: "item-1", description: "A text field for entering home country" },
      { item: "item-2", description: "A text field for entering home city" },
      { item: "item-3", description: "A button to submit the form" },
    ]);
    return {
      [ToolLLM.GetActive]: getActive,
      [ToolLLM.ListAvailable]: ListAvailable,
    };
  }
  it("[OLLAMA] Asking what the active item does", async () => {
    const res = await runAsk(askOllama, "What does this do?", mockFormScene());
    // await askAboutActiveItem(Provider.OPENAI, "gpt-4o-mini");
    expect(res[0].help).toContain("country");
  }, 60_000);

  it("[OLLAMA] Asking which item should be used", async () => {
    const res = await runAsk(
      askOllama,
      "How do I send this form?",
      mockFormScene(),
    );
    expect(res[0].item).toEqual("item-3");
  }, 60_000);

  it("[OPENAI] Asking what the active item does", async () => {
    const res = await runAsk(askOllama, "What does this do?", mockFormScene());
    // await askAboutActiveItem(Provider.OPENAI, "gpt-4o-mini");
    expect(res[0].help).toContain("country");
  }, 60_000);

  it("[OPENAI] Asking which item should be used", async () => {
    const res = await runAsk(
      askOllama,
      "How do I send this form?",
      mockFormScene(),
    );
    expect(res[res.length - 1].item).toEqual("item-3");
  }, 60_000);
});
