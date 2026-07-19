import { create, StoreApi, UseBoundStore } from "zustand";
import { USERS } from "../models/user";

export const useUser = create((set) => ({
  user: null,
  updateUser: (newBears: USERS) => set({ user: newBears }),
}));
