import { create, StoreApi, UseBoundStore } from "zustand";
import { NOTIFICATONS } from "../models/notifications";

export const useNotifications: UseBoundStore<
  StoreApi<{
    notifications: NOTIFICATONS[];
    updateNotifications: (user: NOTIFICATONS[]) => void;
    isLoading: boolean;
    updateLoading: (newLoading: boolean) => void;
  }>
> = create((set) => ({
  notifications: [],
  isLoading: false,
  updateNotifications: (newBears: NOTIFICATONS[]) =>
    set({ notifications: newBears }),
  updateLoading: (newLoading: boolean) => set({ isLoading: newLoading }),
}));
