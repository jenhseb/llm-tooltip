import MessageDisplay from "./MessageDisplay";
import MessageInput, { MessageInputProps } from "./MessageInput";
import { DisplayMessage } from "./types";
import { useMemo } from "react";

export interface MessageGroupProps extends MessageInputProps {
  messages: DisplayMessage[];
  hasInput: boolean;
}

const MessageGroup = ({ messages, hasInput, onSubmit }: MessageGroupProps) => {
  return (
    <div className="scrollbar-hover flex max-w-full flex-col gap-1 p-3">
      {messages.map((m, i) => (
        <MessageDisplay key={`${i}`} msg={m} />
      ))}
      {hasInput && <MessageInput onSubmit={onSubmit} />}
    </div>
  );
};

export default MessageGroup;
