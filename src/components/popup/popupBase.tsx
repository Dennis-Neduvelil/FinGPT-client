import React, { useEffect, useState, useCallback } from "react";
import { PopupVariant, type PopupVariantType } from "@/types";

interface PopupBaseProps {
  /** Variant type of the popup (controls colors) */
  variant: PopupVariantType;
  /** Heading/title displayed at the top */
  heading: string;
  /** Message/description displayed below the heading */
  message: string;
  /** Whether the popup should be visible (default: true) */
  open?: boolean;
  /** Callback function called when popup is closed */
  onClose?: () => void;
  /** Time in milliseconds before the popup auto-closes (default: 5000ms) */
  autoCloseDuration?: number;
}

/**
 * `PopupBase` is a reusable alert/popup component that supports multiple variants
 * (SUCCESS, ERROR, WARNING, INFO).
 *
 * Features:
 * - Smooth animations for enter/exit
 * - Auto-close functionality with a configurable duration
 * - Progress bar indicating remaining time before auto-close
 * - Manual close button (✕) for user dismissal
 *
 * @component
 * @example
 * ```tsx
 * <PopupBase
 *   variant={PopupVariant.SUCCESS}
 *   heading="Success!"
 *   message="Your profile has been updated successfully."
 *   open={true}
 *   autoCloseDuration={4000}
 *   onClose={() => console.log("Popup closed")}
 * />
 * ```
 */
export const PopupBase: React.FC<PopupBaseProps> = ({
  variant,
  heading,
  message,
  open = true,
  onClose,
  autoCloseDuration = 5000,
}) => {
  const [visible, setVisible] = useState(open);
  const [progress, setProgress] = useState(100);

  // Sync state with `open` prop
  useEffect(() => {
    setVisible(open);
    setProgress(100);
  }, [open]);

  /**
   * Closes the popup with fade-out animation.
   */
  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => onClose?.(), 300); // match animation duration
  }, [onClose]);

  // Handle auto-close and progress bar countdown
  useEffect(() => {
    if (visible) {
      const step = 100 / (autoCloseDuration / 100);
      const interval = setInterval(() => {
        setProgress((p) => Math.max(p - step, 0));
      }, 100);

      const timeout = setTimeout(() => {
        handleClose();
      }, autoCloseDuration);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [visible, autoCloseDuration, handleClose]);

  if (!visible) return null;

  // Styling based on popup variant
  const variantStyles: Record<PopupVariantType, string> = {
    [PopupVariant.SUCCESS]: "border-green-500 text-green-800",
    [PopupVariant.ERROR]: "border-red-500 text-red-800",
    [PopupVariant.WARNING]: "border-yellow-500 text-yellow-800",
    [PopupVariant.INFO]: "border-black text-black",
  };

  // Progress bar colors based on variant
  const barColors: Record<PopupVariantType, string> = {
    [PopupVariant.SUCCESS]: "bg-green-500",
    [PopupVariant.ERROR]: "bg-red-500",
    [PopupVariant.WARNING]: "bg-yellow-500",
    [PopupVariant.INFO]: "bg-black",
  };

  return (
    <div className="fixed top-6 right-6 w-96">
      {/* Popup Container */}
      <div
        className={`px-3 py-2 shadow-2xl flex flex-col items-start
        bg-white/90 backdrop-blur-md
        transition-all duration-300 ease-in-out
        ${variantStyles[variant]} 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-start w-full">
          <div>
            <h3 className="font-semibold text-base">{heading}</h3>
            <p className="text-sm mt-1 text-gray-700 whitespace-pre-line">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="ml-3 text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-white/90 backdrop-blur-md overflow-hidden">
        <div
          className={`h-1 ${barColors[variant]} transition-all duration-100`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
