import { create, StoreApi, UseBoundStore } from "zustand";

export const useSnackBar: UseBoundStore<
  StoreApi<{
    snackbar: { show: boolean; msg: string; type: string };
    showSnackBar: (msg: string, type: string) => void;
    hideSnackBar: () => void;
  }>
> = create((set) => ({
  snackbar: { msg: "", type: "", show: false },
  showSnackBar: (msg: string, type: string) => {
    set({ snackbar: { show: true, msg: msg, type } });
    const timer = setTimeout(
      () => set({ snackbar: { show: false, msg: "", type: "" } }),
      5000,
    );
  },
  hideSnackBar: () => {
    set({ snackbar: { show: false, msg: "", type: "" } });
  },
}));
