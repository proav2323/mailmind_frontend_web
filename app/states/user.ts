import { create, StoreApi, UseBoundStore } from "zustand";
import { USERS } from "../models/user";

export const useUser: UseBoundStore<
  StoreApi<{
    user: USERS | null;
    token: string | null;
    updateUser: (user: USERS | null) => void;
    isLoading: boolean;
    updateLoading: (newL: boolean) => void;
    updateToken: (newT: string | null) => void;
  }>
> = create((set) => ({
  user: null,
  token: null,
  updateToken: (newT: string | null) => set({ token: newT }),
  isLoading: false,
  updateLoading: (newL: boolean) => set({ isLoading: newL }),
  updateUser: (newBears: USERS | null) => set({ user: newBears }),
}));
