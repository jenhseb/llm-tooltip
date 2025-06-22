import { PropsWithChildren } from "react";
import { Bot, UserRound } from "lucide-react";
import { ChatMessage } from "@/types";
import { useHighlighted } from "@/context/HighlightContext";
import { useActive } from "@/context/ActiveContext";

type MessageContainerProps = Pick<ChatMessage, "role" | "toolTipId">;

const MessageContainer = ({
  role,
  children,
  toolTipId,
}: PropsWithChildren<MessageContainerProps>) => {
  const Icon = role === "assistant" ? Bot : UserRound;
  const { color, isHighlighted } = useHighlighted(toolTipId);
  const { isActive } = useActive(toolTipId);

  return (
    <div
      style={
        isHighlighted && !isActive
          ? { borderColor: color, borderWidth: 2, borderStyle: "solid" }
          : undefined
      }
      className={`relative flex w-full flex-row items-center gap-2 rounded-md ${
        role === "assistant"
          ? "border-bot-200 bg-bot-100"
          : "border-user-200 bg-user-100"
      } p-3`}
    >
      <Icon
        className={`absolute -top-2 -left-2 h-6 w-6 rounded-full border p-1 ${
          role === "assistant"
            ? "border-bot-400 bg-bot-300"
            : "border-user-400 bg-user-300"
        }`}
      />
      {children}
    </div>
  );
};

export default MessageContainer;
