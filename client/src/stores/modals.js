import { create } from "zustand";

const useModalStore = create((set) => ({
  loginVisible: false,
  setLoginVisible: (visible) => set((state) => ({ loginVisible: visible })),
}));

export default useModalStore;
