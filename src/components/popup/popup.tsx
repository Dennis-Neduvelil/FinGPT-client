import React from "react";
import { usePopupStore } from "@/store";
import { PopupBase } from "./popupBase";

/**
 * Global `Popup` component that connects `PopupBase` with the Zustand popup store.
 *
 * This component listens to the global popup state (via `usePopupStore`) and renders
 * a `PopupBase` with the appropriate props (heading, message, variant, visibility).
 *
 * It is meant to be mounted once in the root of your app (e.g., in `App.tsx`) so that
 * popups can be triggered from anywhere in your application by calling `usePopupStore().showPopup`.
 *
 * Features:
 * - Automatically displays based on Zustand state
 * - Closes when the user clicks ✕ or after `autoCloseDuration`
 * - Calls `hidePopup` from the store on close
 *
 * @example
 * ```tsx
 * // Mount globally (e.g., in App.tsx)
 * function App() {
 *   return (
 *     <>
 *       <Router />
 *       <Popup />  // Only needs to be declared once
 *     </>
 *   );
 * }
 *
 * // Show a popup from anywhere:
 * const { showPopup } = usePopupStore();
 * showPopup({
 *   heading: "Error",
 *   message: "Something went wrong",
 *   variant: PopupVariant.ERROR,
 * });
 * ```
 */
export const Popup: React.FC = () => {
  const { open, heading, message, variant, hidePopup } = usePopupStore();

  return (
    <PopupBase
      variant={variant}
      heading={heading}
      message={message}
      open={open}
      onClose={hidePopup}
      autoCloseDuration={5000}
    />
  );
};