import MessageContainer from "./MessageContainer";
import { useEffect } from "react";
import { ChatMessage } from "@/types";
import { useSetHighlighted, useHighlighted } from "@/context/HighlightContext";

const MessageDisplay = ({ msg }: { msg: ChatMessage }) => {
  const { addHighlight, removeHighlight } = useSetHighlighted(
    msg.id,
    msg.toolTipId,
  );

  useEffect(() => {
    addHighlight?.();

    return () => {
      removeHighlight?.();
    };
  }, [addHighlight, removeHighlight]);

  return (
    <MessageContainer role={msg.role} toolTipId={msg.toolTipId}>
      <span className="prose prose-p prose-neutral prose-p">{msg.content}</span>
    </MessageContainer>
  );
};

export default MessageDisplay;
