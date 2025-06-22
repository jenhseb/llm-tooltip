import useTip, { UseTipParams } from "@/hooks/useTip";
import { PropsWithChildren } from "react";
import ActiveToolTip, { ActiveProps } from "./Active";
import HighlightToolTip, { HighlightProps } from "./Higlight";
import InactiveToolTip, { InactiveProps } from "./Inactive";
import { type ModelParams } from "@/llm";

interface WrapperParams extends UseTipParams, Partial<ModelParams> {
  Highlighted?: React.ComponentType<HighlightProps>;
  Inactive?: React.ComponentType<InactiveProps>;
  Active?: React.ComponentType<ActiveProps>;
}

const ToolTipWrapper: React.FC<PropsWithChildren<WrapperParams>> = ({
  Highlighted = HighlightToolTip,
  Inactive = InactiveToolTip,
  Active = ActiveToolTip,
  description,
  children,
  ...modelParams
}) => {
  const {
    activate,
    deactivate,
    activateHotKey,
    isActive,
    highlightInfo,
    isHighlighted,
  } = useTip({
    description,
  });

  if (isActive) {
    return (
      <Active deactivate={deactivate} children={children} {...modelParams} />
    );
  } else if (isHighlighted) {
    return <Highlighted highlightInfo={highlightInfo} children={children} />;
  } else {
    return (
      <Inactive
        activate={activate}
        activateHotKey={activateHotKey}
        children={children}
      />
    );
  }
};

export default ToolTipWrapper;
