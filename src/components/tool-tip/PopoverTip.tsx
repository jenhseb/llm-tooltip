import { Popover } from "radix-ui";
import { PropsWithChildren } from "react";
import { X } from "lucide-react";
import type { TipBaseProps } from "./types";
import CloseButton from "../CloseButton";

export interface PopoverProps<P extends object> extends TipBaseProps<P> {
  onClose: () => void;
}
const PopoverBase = <P extends object>({
  defaultOpen,
  onOpenChange,
  children,
  Content,
  open,
  onClose,
  contentProps = {} as P,
}: PropsWithChildren<PopoverProps<P>>) => {
  return (
    <Popover.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content onEscapeKeyDown={onClose}>
          <div className="box-shadow-lg relative flex">
            <Content {...contentProps} />
            <Popover.Close asChild>
              <CloseButton onClick={onClose} />
            </Popover.Close>
          </div>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverBase;
