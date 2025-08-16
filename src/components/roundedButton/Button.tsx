/**
 * RoundedButton is a customizable button component with rounded borders.
 * Supports optional icon display, color variants, filled/outlined style, and disabled state.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <RoundedButton
 *   name="Click Me"
 *   onClickHandler={() => console.log("Button clicked")}
 * />
 *
 * @example
 * // Usage with left-positioned icon
 * <RoundedButton
 *   name="Download"
 *   icon="/icons/download.svg"
 *   iconPosition={Position.LEFT}
 *   color={Color.BLUE}
 *   filled
 *   onClickHandler={() => console.log("Download clicked")}
 * />
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The text label displayed on the button.
 * @param {() => void} props.onClickHandler - Callback function triggered when the button is clicked.
 * @param {string|null} [props.icon=null] - Optional icon source URL to display inside the button.
 * @param {PositionType} [props.iconPosition=Position.LEFT] - Determines whether the icon appears on the left or right of the text.
 * @param {ColorType} [props.color=Color.BLACK] - Button color variant.
 * @param {boolean} [props.filled=false] - If true, renders a filled button; otherwise, outlined.
 * @param {boolean} [props.disabled=false] - If true, disables the button.
 * @returns {JSX.Element} The rendered button component.
 */

import React from "react";
import {
  Position,
  Color,
  type PositionType,
  type ColorType,
} from "../../types";
import { getButtonClasses } from "./constants";

interface RoundedButtonProps {
  name: string;
  onClickHandler: () => void;
  icon?: string | null;
  iconPosition?: PositionType;
  color?: ColorType;
  filled?: boolean;
  disabled?: boolean;
}


/**
 * Icon component for displaying an icon image inside the button.
 * @param {Object} props
 * @param {string|null} props.icon - Icon source URL.
 * @returns {JSX.Element}
 */
interface IconProps {
  icon: string | null;
}
const Icon: React.FC<IconProps> = ({ icon }) => {
  return <img className="h-5 w-5" src={icon ?? ""} alt="icon" />;
};

export const RoundedButton: React.FC<RoundedButtonProps> = ({
  name,
  onClickHandler,
  icon = null,
  iconPosition = Position.LEFT,
  color = Color.BLACK,
  filled = false,
  disabled = false,
}) => {
  return (
    <button
      className={`
        flex items-center justify-center gap-2 px-4 py-2 rounded-[100px] transition
        ${getButtonClasses(filled, color)}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
      onClick={!disabled ? onClickHandler : undefined}
      disabled={disabled}
    >
      {icon && iconPosition === Position.LEFT && <Icon icon={icon} />}
      <span className="text-md font-light">{name}</span>
      {icon && iconPosition === Position.RIGHT && <Icon icon={icon} />}
    </button>
  );
};
