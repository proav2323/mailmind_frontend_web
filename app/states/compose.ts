import { create, StoreApi, UseBoundStore } from "zustand";

export const useCompose: UseBoundStore<
  StoreApi<{
    snackbar: { show: boolean };
    showSnackBar: () => void;
    hideSnackBar: () => void;
  }>
> = create((set) => ({
  snackbar: { show: false },
  showSnackBar: () => {
    set({ snackbar: { show: true } });
  },
  hideSnackBar: () => {
    set({ snackbar: { show: false } });
  },
}));
