import { create } from "zustand";

export const useScrollStore = create((set) => ({
  scrollOffset: 0,
  setScrollOffset: (offset) => set({ scrollOffset: offset }),
}));
