import { create, StoreApi, UseBoundStore } from "zustand";
import { EMAILS } from "../models/emails";
import { EMAIL } from "../dashboard/email/[id]/page";

export const useEmails: UseBoundStore<
  StoreApi<{
    emails: EMAILS[];
    email: EMAIL | null;
    updateEmails: (user: EMAILS[]) => void;
    isLoading: boolean;
    updateLoading: (newLoading: boolean) => void;
    updateEmail: (newEmail: EMAIL | null) => void;
  }>
> = create((set) => ({
  emails: [],
  isLoading: false,
  email: null,
  updateEmails: (newBears: EMAILS[]) => set({ emails: newBears }),
  updateLoading: (newLoading: boolean) => set({ isLoading: newLoading }),
  updateEmail: (newEmail: EMAIL | null) => set({ email: newEmail }),
}));
