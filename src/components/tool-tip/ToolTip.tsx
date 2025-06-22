import { Tooltip, Popover } from "radix-ui";
import { TOOLTIP_DELAY } from "@/constants";
import { PropsWithChildren, useRef } from "react";
import type { TipBaseProps } from "./types";

interface ToolTipProps<P extends object> extends TipBaseProps<P> {}

const ToolTip = <P extends object>({
  defaultOpen,
  onOpenChange,
  children,
  Content,
  open,
  contentProps = {} as P,
}: PropsWithChildren<ToolTipProps<P>>) => {
  return (
    <Tooltip.Provider delayDuration={TOOLTIP_DELAY}>
      <Tooltip.Root
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        open={open}
      >
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content>
            <Content {...contentProps} />
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default ToolTip;
