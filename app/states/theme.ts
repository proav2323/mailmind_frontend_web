import { create, StoreApi, UseBoundStore } from "zustand";

export const useTheme: UseBoundStore<
  StoreApi<{
    theme: "dark" | "light";
    updateTheme: (value: "dark" | "light") => void;
  }>
> = create((set) => ({
  theme: "light",
  updateTheme: (value) => {
    set({ theme: value });
    localStorage.setItem("theme", value);
  },
}));
