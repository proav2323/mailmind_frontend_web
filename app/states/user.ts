import { create, StoreApi, UseBoundStore } from "zustand";
import { USERS } from "../models/user";

export const useUser: UseBoundStore<
  StoreApi<{
    user: USERS | null;
    updateUser: (user: USERS | null) => void;
    isLoading: boolean;
    updateLoading: (newL: boolean) => void;
  }>
> = create((set) => ({
  user: null,
  isLoading: false,
  updateLoading: (newL: boolean) => set({ isLoading: newL }),
  updateUser: (newBears: USERS | null) => set({ user: newBears }),
}));
