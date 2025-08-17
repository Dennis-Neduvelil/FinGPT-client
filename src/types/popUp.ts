export const PopupVariant = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  WARNING: "WARNING",
  INFO: "INFO",
} as const;

export type PopupVariantType = typeof PopupVariant[keyof typeof PopupVariant];