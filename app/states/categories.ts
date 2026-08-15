import { create, StoreApi, UseBoundStore } from "zustand";

export const useCategories: UseBoundStore<
  StoreApi<{
    categories: { name: string }[];
    updateCategories: (user: { name: string }[]) => void;
    isLoading: boolean;
    updateLoading: (newLoading: boolean) => void;
  }>
> = create((set) => ({
  categories: [],
  isLoading: false,
  updateCategories: (newBears: { name: string }[]) =>
    set({ categories: newBears }),
  updateLoading: (newLoading: boolean) => set({ isLoading: newLoading }),
}));
