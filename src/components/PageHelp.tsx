import { ChatWindow, ChatWindowProps } from "./chat";
import { CircleQuestionMark, X } from "lucide-react";
import { PropsWithChildren, useState, FC } from "react";
import CloseButton from "./CloseButton";

interface PageHelpProps extends ChatWindowProps {}

const HelpContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className="fixed bottom-0 left-0">{children}</div>;
};

const PageHelp: FC<PageHelpProps> = (props) => {
  const [showHelp, setShowHelp] = useState(false);

  if (showHelp) {
    return (
      <HelpContainer>
        <ChatWindow {...props} />
        <CloseButton onClick={() => setShowHelp(false)} />
      </HelpContainer>
    );
  }

  return (
    <HelpContainer>
      <CircleQuestionMark
        role="button"
        data-testid="page-help-button"
        className="btn btn-circle btn-lg btn-primary"
        color="white"
        onClick={() => setShowHelp(true)}
      />
    </HelpContainer>
  );
};

export default PageHelp;
