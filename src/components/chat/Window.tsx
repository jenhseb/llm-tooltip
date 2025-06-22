import useChat, { type UseChatProps } from "@/hooks/useChat";
import MessageGroup from "./MessageGroup";
import { FC } from "react";

export interface WindowProps extends UseChatProps {
  onlyFinalResponses?: boolean;
}

const Window: FC<WindowProps> = ({
  onlyFinalResponses = true,
  ...useChatProps
}) => {
  const { ask, latestResponse } = useChat(useChatProps);

  return (
    <div className="max-h-50 w-70">
      <MessageGroup messages={latestResponse} hasInput={true} onSubmit={ask} />
    </div>
  );
};

export default Window;
