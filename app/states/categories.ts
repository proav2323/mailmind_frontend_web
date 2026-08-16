import { create, StoreApi, UseBoundStore } from "zustand";

export const useCategories: UseBoundStore<
  StoreApi<{
    categories: { name: string; id: string }[];
    updateCategories: (user: { name: string; id: string }[]) => void;
    isLoading: boolean;
    updateLoading: (newLoading: boolean) => void;
  }>
> = create((set) => ({
  categories: [],
  isLoading: false,
  updateCategories: (newBears: { name: string; id: string }[]) =>
    set({ categories: newBears }),
  updateLoading: (newLoading: boolean) => set({ isLoading: newLoading }),
}));
