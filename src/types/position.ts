export const Position = {
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
} as const;

export type PositionType = typeof Position[keyof typeof Position];