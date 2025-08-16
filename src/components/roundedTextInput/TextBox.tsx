
/**
 * RoundedTextBox is a customizable text input component with rounded borders.
 * Supports password visibility toggle, error display, and color variants.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <RoundedTextBox
 *   label="Email"
 *   value={email}
 *   onChange={setEmail}
 *   type={Input.EMAIL}
 * />
 *
 * @example
 * // Password input with toggle
 * <RoundedTextBox
 *   label="Password"
 *   value={password}
 *   onChange={setPassword}
 *   type={Input.PASSWORD}
 *   error={errorMsg}
 * />
 *
 * @param {Object} props - The component props.
 * @param {string} [props.id] - Optional id for the input element.
 * @param {string} props.label - Label displayed above the input.
 * @param {string} props.value - Current value of the input.
 * @param {(value: string) => void} props.onChange - Callback for input value change.
 * @param {ColorType} [props.color] - Color variant for border.
 * @param {string|null} [props.error] - Error message to display below input.
 * @param {InputType} [props.type] - Type of input (text, email, password).
 * @returns {JSX.Element} The rendered rounded text box component.
 */
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Color, Input, type ColorType, type InputType } from "../../types";
import { borderColors } from "./constants";

interface RoundedTextBoxProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  color?: ColorType;
  error?: string | null;
  type?: InputType;
}

export const RoundedTextBox: React.FC<RoundedTextBoxProps> = ({
  id,
  label,
  value,
  onChange,
  color = Color.BLACK,
  error = null,
  type = Input.TEXT,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const colorClass = borderColors[color] ?? borderColors.black;

  // compute input type correctly
  const inputType =
    type === Input.PASSWORD
      ? showPassword
        ? "text"
        : "password"
      : type === Input.EMAIL
      ? "email"
      : "text";

  return (
    <div className="w-full">
      <div
        className={`relative border rounded-[100px] w-80 h-12 m-2 px-3 flex items-center transition-opacity duration-200 opacity-80 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : colorClass
        }`}
      >
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=" "
          className="block w-full pr-8 border-none bg-transparent text-md text-gray-900 focus:outline-none focus:ring-0 placeholder-transparent"
        />

        {/* Password toggle button */}
        {type === Input.PASSWORD && (
          <button
            type="button"
            onClick={() => setShowPassword((prev: boolean) => !prev)}
            className="absolute right-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        <label
          htmlFor={id}
          className={`absolute left-3 px-1 bg-[#F9F9F9] transition-all pointer-events-none ${
            isFocused || value ? "-top-1 text-xs" : "top-3 text-md"
          } ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {label}
        </label>
      </div>

      {/* Error message below the input */}
      {error && (
        <p className="text-red-500 text-xs mt-1 ml-5">{error}</p>
      )}
    </div>
  );
};