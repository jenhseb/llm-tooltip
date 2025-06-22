import { default as SmartToolTip } from "./Wrapper";

import { ActiveProps as SmartToolTipActiveProps } from "./Active";
import { HighlightProps as SmartToolTipHighlightProps } from "./Higlight";
import { InactiveProps as SmartToolTipInactiveProps } from "./Inactive";

SmartToolTip.displayName = "SmartToolTip";

export { SmartToolTip };
export type {
  SmartToolTipActiveProps,
  SmartToolTipHighlightProps,
  SmartToolTipInactiveProps,
};
export type { ActiveContentToolTipProps, ActiveToolTipProps } from "./Active";
export type {
  HighlightToolTipProps,
  HighlightToolTipContentProps,
} from "./Higlight";
export type {
  InactiveToolTipProps,
  InactiveToolTipContentProps,
} from "./Inactive";
