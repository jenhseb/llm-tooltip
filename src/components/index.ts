import { default as SmartToolTipProvider } from "./Provider";
import { default as SmartToolTipHelp } from "./PageHelp";
export { SmartToolTip } from "./tool-tip";

SmartToolTipProvider.displayName = "SmartToolTipProvider";
SmartToolTipHelp.displayName = "SmartToolTipHelp";
export { SmartToolTipProvider, SmartToolTipHelp };
export type {
  SmartToolTipActiveProps,
  SmartToolTipHighlightProps,
  SmartToolTipInactiveProps,
  ActiveContentToolTipProps,
  ActiveToolTipProps,
  HighlightToolTipProps,
  HighlightToolTipContentProps,
  InactiveToolTipProps,
  InactiveToolTipContentProps,
} from "@/components/tool-tip";
