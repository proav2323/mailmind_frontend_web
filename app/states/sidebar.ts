import { create, StoreApi, UseBoundStore } from "zustand";
import { USERS } from "../models/user";

export const useSidebar: UseBoundStore<
  StoreApi<{
    open: boolean;
    updateOpen: (value: boolean) => void;
  }>
> = create((set) => ({
  open:
    localStorage.getItem("open") !== null
      ? (JSON.parse(localStorage.getItem("open")!) as boolean)
      : true,
  updateOpen: (value) => {
    set({ open: value });
    localStorage.setItem("open", JSON.stringify(value));
  },
}));
