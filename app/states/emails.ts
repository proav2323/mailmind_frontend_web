import { create, StoreApi, UseBoundStore } from "zustand";
import { EMAILS } from "../models/emails";
import { EMAIL } from "../dashboard/email/[id]/page";

export const useEmails: UseBoundStore<
  StoreApi<{
    emails: EMAILS[];
    email: EMAIL | null;
    updateEmails: (user: EMAILS[], add: boolean, oldEmails?: EMAILS[]) => void;
    isLoading: boolean;
    nextCursor: string | undefined;
    hasMore: boolean;
    updateLoading: (newLoading: boolean) => void;
    updateEmail: (newEmail: EMAIL | null) => void;
    updateCursor: (nextCursor: string | undefined) => void;
    updateMore: (val: boolean) => void;
  }>
> = create((set) => ({
  emails: [],
  isLoading: false,
  email: null,
  nextCursor: undefined,
  hasMore: false,
  updateEmails: (newBears: EMAILS[], add: boolean, oldEmails?: EMAILS[]) => {
    if (add) {
      if (oldEmails) {
        oldEmails.push(...newBears);
        set({ emails: oldEmails });
      } else {
        set({ emails: newBears });
      }
    } else {
      set({ emails: newBears });
    }
  },
  updateLoading: (newLoading: boolean) => set({ isLoading: newLoading }),
  updateEmail: (newEmail: EMAIL | null) => set({ email: newEmail }),
  updateMore: (newVal: boolean) => set({ hasMore: newVal }),
  updateCursor: (nextCursor: string | undefined) =>
    set({ nextCursor: nextCursor }),
}));
