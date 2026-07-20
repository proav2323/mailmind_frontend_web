import { create, StoreApi, UseBoundStore } from "zustand";
import { USERS } from "../models/user";

export const useUser: UseBoundStore<
  StoreApi<{ user: USERS | null; updateUser: (user: USERS | null) => void }>
> = create((set) => ({
  user: null,
  updateUser: (newBears: USERS | null) => set({ user: newBears }),
}));
