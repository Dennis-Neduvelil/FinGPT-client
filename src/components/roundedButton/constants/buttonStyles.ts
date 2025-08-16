import { type ColorType } from "../../../types";

export const colorClasses: Record<ColorType, { filled: string; outline: string }> = {
  red: { filled: "bg-red-500", outline: "border-[1.5px] border-red-500" },
  blue: { filled: "bg-blue-400", outline: "border-[1.5px] border-blue-400" },
  green: { filled: "bg-green-400", outline: "border-[1.5px] border-green-400" },
  amber: { filled: "bg-amber-400", outline: "border-[1.5px] border-amber-400" },
  gray: { filled: "bg-gray-400", outline: "border-[1.5px] border-gray-400" },
  yellow: { filled: "bg-yellow-300", outline: "border-[1.5px] border-yellow-300" },
  indigo: { filled: "bg-indigo-400", outline: "border-[1.5px] border-indigo-400" },
  purple: { filled: "bg-purple-400", outline: "border-[1.5px] border-purple-400" },

  slate: { filled: "bg-slate-400", outline: "border-[1.5px] border-slate-400" },
  zinc: { filled: "bg-zinc-400", outline: "border-[1.5px] border-zinc-400" },
  neutral: { filled: "bg-neutral-400", outline: "border-[1.5px] border-neutral-400" },
  stone: { filled: "bg-stone-400", outline: "border-[1.5px] border-stone-400" },
  orange: { filled: "bg-orange-400", outline: "border-[1.5px] border-orange-400" },
  lime: { filled: "bg-lime-300", outline: "border-[1.5px] border-lime-300" },
  emerald: { filled: "bg-emerald-400", outline: "border-[1.5px] border-emerald-400" },
  teal: { filled: "bg-teal-300", outline: "border-[1.5px] border-teal-500" },
  cyan: { filled: "bg-cyan-300", outline: "border-[1.5px] border-cyan-300" },
  sky: { filled: "bg-sky-300", outline: "border-[1.5px] border-sky-300" },
  violet: { filled: "bg-violet-300", outline: "border-[1.5px] border-violet-300" },
  fuchsia: { filled: "bg-fuchsia-300", outline: "border-[1.5px] border-fuchsia-300" },
  pink: { filled: "bg-pink-300", outline: "border-[1.5px] border-pink-300" },
  rose: { filled: "bg-rose-300", outline: "border-[1.5px] border-rose-300" },

  white: { filled: "bg-white", outline: "border-[1.5px] border-white" },
  black: { filled: "bg-black", outline: "border-[1.5px] border-black" }
};

export const baseClasses = (filled: boolean) => {
  return `text-small w-80 h-12 p-2 m-2 flex gap-4 items-center justify-center transition-colors duration-200 ease-in-out  cursor-pointer rounded-[100px] 
        ${filled ? "hover:opacity-80" : "hover:bg-teal-100"}
        focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-blue`
    ;
}

export const getTextColorClass = (filled: boolean, color: ColorType): string => {
  const lightColors: ColorType[] = [
    "amber", "yellow", "white", "gray", "slate", "zinc", "neutral", "stone", "lime"
  ];
  if (!filled) {
    return `text - ${color} -500`;
  }
  if (color === "black") return "text-white";
  return lightColors.includes(color) ? "text-black" : "text-white";
};

export const getButtonClasses = (
  filled: boolean,
  color: ColorType
): string => {
  const filledClass = colorClasses[color].filled;
  const outlineClass = colorClasses[color].outline;

  return [
    baseClasses(filled),
    filled ? filledClass : outlineClass,
    getTextColorClass(filled, color),
  ].join(" ");
};