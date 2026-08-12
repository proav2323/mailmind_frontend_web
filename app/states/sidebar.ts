import { create, StoreApi, UseBoundStore } from "zustand";

export const useSidebar: UseBoundStore<
  StoreApi<{
    open: boolean;
    updateOpen: (value: boolean) => void;
  }>
> = create((set) => ({
  open: true,
  updateOpen: (value) => {
    set({ open: value });
    localStorage.setItem("open", JSON.stringify(value));
  },
}));
