export const IS_PROD = process.env.NODE_ENV === "production";

export const TOOLTIP_DELAY = IS_PROD ? 1000 : 0;
