import { useState, useRef, useEffect } from "react";
import MessageContainer from "./MessageContainer";
import { SendHorizonal } from "lucide-react";
import { isMacOs } from "react-device-detect";

const isValid = (question: string) => {
  return question.trim().length > 0;
};
export interface MessageInputProps {
  onSubmit: (question: string) => Promise<void>;
}
const MessageInput = ({ onSubmit }: MessageInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [submitting]);
  const [question, setQuestion] = useState("");
  const disabled = !isValid(question) || submitting;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter") {
      return;
    }
    const isCmdEnter =
      (isMacOs && event.metaKey) || (!isMacOs && event.ctrlKey);

    if (!isCmdEnter) {
      return;
    }
    event.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    setSubmitting(true);
    onSubmit(question)
      .then(() => {
        setSubmitting(false);
        setQuestion("");
      })
      .catch((e) => {
        console.error(e);
        setSubmitting(false);
        setErrorMsg(e.message);
      });
  };
  return (
    <MessageContainer role="user">
      <div className="flex w-full flex-col gap-1">
        <textarea
          ref={inputRef}
          rows={1}
          onKeyDown={handleKeyDown}
          className="border-user-300 focus:border-user-500 focus:ring-user-500 scrollbar-hover w-full resize-none rounded-md border p-1 focus:ring-1 focus:outline-none"
          value={question}
          data-testid="message-input-textarea"
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        {submitting ? (
          <span className="loading loading-ring loading-md absolute -right-2 -bottom-2"></span>
        ) : (
          <button
            onClick={handleSubmit}
            data-testid="message-input-submit"
            disabled={!isValid(question) || submitting}
            className={`btn btn-circle bg-user-500 absolute -right-2 -bottom-2 h-5 w-5 border-none hover:opacity-50 focus:outline-none ${disabled && "btn-disabled"}`}
          >
            <SendHorizonal color="white" className="h-3 w-3" />
          </button>
        )}

        {errorMsg && (
          <div className="text-xs text-red-500">
            Failed to Submit: System Error
          </div>
        )}
      </div>
    </MessageContainer>
  );
};

export default MessageInput;
