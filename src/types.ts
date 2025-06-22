// Tool Tip Info Types
export type ToolTipInfo = {
  description: string;
};
export type ToolTipId = string;

export interface ToolTipContext {
  info: Record<ToolTipId, ToolTipInfo>;
  updateInfo: (id: ToolTipId, info: ToolTipInfo) => void;
}

// LLM Types
export enum ToolLLM {
  ListAvailable = "listAvailable",
  GetActive = "getActive",
}

export type ToolDescriptionLLM = { name: string; description: string };

export type ToolLLMFuncs = {
  [ToolLLM.ListAvailable]: () => { item: string; description: string }[];
  [ToolLLM.GetActive]: () => { item: string; description: string } | null;
};

export type ChatMessageId = string;

export interface ChatMessage {
  content: string;
  toolTipId?: string;
  role: "user" | "assistant";
  id: ChatMessageId;
}
