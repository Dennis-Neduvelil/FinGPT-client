export const Input = {
    TEXT: 'TEXT',
    PASSWORD: 'PASSWORD',
    EMAIL: 'EMAIL',
    NUMBER: 'NUMBER'
} as const;

export type InputType = typeof Input[keyof typeof Input];