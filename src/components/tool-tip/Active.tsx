import { ChatWindow } from "@/components/chat";
import PopoverTip, { PopoverProps } from "./PopoverTip";
import { PropsWithChildren } from "react";
import { type ModelParams } from "@/llm";

export type ActiveProps = PropsWithChildren<
  {
    deactivate: () => void;
  } & Partial<ModelParams>
>;

export type ActiveContentToolTipProps = Omit<ActiveProps, "deactivate">;

export interface ActiveToolTipProps extends ActiveProps {
  TipContent?: React.ComponentType<ActiveContentToolTipProps>;
}

const ActiveToolTip: React.FC<ActiveToolTipProps> = ({
  deactivate,
  children,
  TipContent = ChatWindow,
  ...modelProps
}) => {
  return (
    <PopoverTip
      open={true}
      Content={TipContent}
      onClose={() => deactivate()}
      children={children}
      contentProps={modelProps}
    />
  );
};

export default ActiveToolTip;
