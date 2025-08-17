import { create } from "zustand";
import { PopupVariant, type PopupVariantType } from "@/types";

interface PopupState {
  open: boolean;
  heading: string;
  message: string;
  variant: PopupVariantType;
  showPopup: (args: {
    heading: string;
    message: string;
    variant?: PopupVariantType;
  }) => void;
  hidePopup: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  open: false,
  heading: "",
  message: "",
  variant: PopupVariant.INFO,
  showPopup: ({ heading, message, variant = PopupVariant.INFO }) =>
    set({ open: true, heading, message, variant }),
  hidePopup: () => set({ open: false }),
}));