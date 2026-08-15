import { create, StoreApi, UseBoundStore } from "zustand";
import { EMAILS } from "../models/emails";

export const useEmails: UseBoundStore<
  StoreApi<{
    emails: EMAILS[];
    updateEmails: (user: EMAILS[]) => void;
    isLoading: boolean;
    updateLoading: (newLoading: boolean) => void;
  }>
> = create((set) => ({
  emails: [],
  isLoading: false,
  updateEmails: (newBears: EMAILS[]) => set({ emails: newBears }),
  updateLoading: (newLoading: boolean) => set({ isLoading: newLoading }),
}));
