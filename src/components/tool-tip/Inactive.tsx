import { useState } from "react";
import { PropsWithChildren } from "react";
import { isMacOs } from "react-device-detect";
import { useHotkeys } from "react-hotkeys-hook";
import ToolTip from "./ToolTip";
interface InactiveBaseProps {
  activateHotKey: string;
}

export type InactiveProps = PropsWithChildren<
  InactiveBaseProps & {
    activate: () => void;
  }
>;

export interface InactiveToolTipContentProps extends InactiveBaseProps {}

export interface InactiveToolTipProps extends InactiveProps {
  TipContent?: React.ComponentType<InactiveToolTipContentProps>;
}

const formatKey = (key: string): string => {
  switch (key.toLowerCase()) {
    case "meta":
      return isMacOs ? "⌘" : "⊞";
    case "control":
      return isMacOs ? "⌃" : "Ctrl";
    case "alt":
      return isMacOs ? "⌥" : "Alt";
    case "shift":
      return "⇧";
    default:
      return key.toUpperCase();
  }
};

const Kbd = ({ children }: { children: React.ReactNode }) => {
  return (
    <kbd className="rounded-lg border-2 border-neutral-200 bg-neutral-100 px-2 py-1.5 text-xs font-semibold text-neutral-800">
      {children}
    </kbd>
  );
};

const InactiveContent = ({ activateHotKey }: { activateHotKey: string }) => {
  return (
    <p className="rounded border-2 border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-500">
      Press{" "}
      {activateHotKey
        .split("+")
        .map((char) => formatKey(char))
        .map((char, index) => (
          <span key={char}>
            <Kbd>{char}</Kbd>
            {index < activateHotKey.split("+").length - 1 ? " + " : " "}
          </span>
        ))}
      for help.
    </p>
  );
};

const InactiveToolTip = ({
  activateHotKey,
  children,
  activate,
  TipContent = InactiveContent,
}: PropsWithChildren<InactiveToolTipProps>) => {
  const [open, setOpen] = useState(false);
  useHotkeys(activateHotKey, (e) => {
    if (!open) {
      return;
    }
    e.preventDefault();
    activate();
  });
  return (
    <ToolTip
      onOpenChange={setOpen}
      defaultOpen={open}
      children={children}
      open={open}
      Content={() => <TipContent activateHotKey={activateHotKey} />}
    />
  );
};

export default InactiveToolTip;
