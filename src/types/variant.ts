export const Variant = {
    SMALL: 'SMALL',
    MEDIUM: 'MEDIUM',
    LARGE: 'LARGE',
} as const;

export type VariantType = typeof Variant[keyof typeof Variant];