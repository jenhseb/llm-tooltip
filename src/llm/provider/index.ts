import { IS_PROD } from "@/constants";

import { askLLM as askOpenAI } from "./openai";
import { askLLM as askOllama } from "./ollama";

export { askOllama, askOpenAI };

export const DEFAULT_ASK_LLM = IS_PROD ? askOpenAI : askOllama;
