import { create } from "zustand";

export const useNavigationStore = create((set, get) => ({

  // Which page/brand is visible
  currentPage: "laedx",          // laedx | hive | nove

  // Swipe direction
  // "left" → go to Hive
  // "right" → go to Nove
  transitionDirection: null,      // left | right | null

  // Range: 0 → 1
  swipeProgress: 0,

  // Prevent spamming transitions
  isTransitioning: false,

  // -----------------------------------------------------
  // ACTIONS
  // -----------------------------------------------------

  setDirection: (dir) => set({ transitionDirection: dir }),

  setProgress: (p) => {
    const clamped = Math.min(Math.max(p, 0), 1);
    set({ swipeProgress: clamped });
  },

  resetProgress: () => set({ swipeProgress: 0 }),

  setPage: (page) => set({ currentPage: page }),

  lockTransition: () => set({ isTransitioning: true }),
  unlockTransition: () => set({ isTransitioning: false }),

  // -----------------------------------------------------
  // MAIN LOGIC
  // -----------------------------------------------------

  /** Called when swipe reaches threshold (>= 0.7) */
  completeTransition: () => {
    const { transitionDirection, setPage, lockTransition } = get();

    lockTransition();

    if (transitionDirection === "left") {
      setPage("hive");
    } else if (transitionDirection === "right") {
      setPage("nove");
    }

    // Reset internal states after
    set({
      swipeProgress: 0,
      transitionDirection: null,
    });
  },

  /** Called when swipe stops before threshold (ex: < 0.6) */
  cancelTransition: () =>
    set({
      swipeProgress: 0,
      transitionDirection: null,
    }),
}));

