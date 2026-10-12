import { create, StoreApi, UseBoundStore } from "zustand";

export const useCompose: UseBoundStore<
  StoreApi<{
    snackbar: { show: boolean };
    id: string;
    showSnackBar: (id: string) => void;
    hideSnackBar: () => void;
  }>
> = create((set) => ({
  snackbar: { show: false },
  id: "",
  showSnackBar: (id: string) => {
    set({ snackbar: { show: true }, id: id });
  },
  hideSnackBar: () => {
    set({ snackbar: { show: false } });
  },
}));
