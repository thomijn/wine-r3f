import create from "zustand";

export const useStore = create((set) => ({
  loading: true,
  setLoading: (data) => set({ loading: data }),
}));
