import { PropsWithChildren } from "react";
import { HighlightInfoExternal } from "@/context/HighlightContext";
import ToolTip from "./ToolTip";

interface HighlightPropsBase {
  highlightInfo: Omit<HighlightInfoExternal, "isHighlighted">;
}

export type HighlightProps = PropsWithChildren<HighlightPropsBase>;

export interface HighlightToolTipContentProps extends HighlightPropsBase {}

export interface HighlightToolTipProps extends HighlightProps {
  TipContent?: React.ComponentType<HighlightToolTipContentProps>;
}
const HighlightedContent = ({
  highlightInfo,
}: HighlightToolTipContentProps) => {
  return (
    <div
      className="rounded border-2 border-neutral-200 p-3 text-2xl text-neutral-900"
      style={{ background: highlightInfo.color }}
    >
      Here
    </div>
  );
};

const HighlightToolTip = ({
  highlightInfo,
  children,
  TipContent = HighlightedContent,
}: HighlightToolTipProps) => {
  return (
    <ToolTip
      children={children}
      open={true}
      Content={() => <TipContent highlightInfo={highlightInfo} />}
    />
  );
};
export default HighlightToolTip;
