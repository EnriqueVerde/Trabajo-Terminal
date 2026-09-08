"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type UIState = {
  sidebarCollapsed: boolean;
  openNavGroups: string[];
  commandPaletteOpen: boolean;
  theme: "light" | "dark";
  toggleSidebar: () => void;
  toggleNavGroup: (id: string) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleTheme: () => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      openNavGroups: [],
      commandPaletteOpen: false,
      theme: "light",

      toggleSidebar: () => set({ sidebarCollapsed: !get().sidebarCollapsed }),

      toggleNavGroup: (id) => {
        const open = get().openNavGroups;
        set({
          openNavGroups: open.includes(id)
            ? open.filter((g) => g !== id)
            : [...open, id],
        });
      },

      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

      toggleTheme: () => {
        const next = get().theme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        set({ theme: next });
      },
    }),
    {
      name: "trabajo-terminal-ui",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        openNavGroups: state.openNavGroups,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) document.documentElement.setAttribute("data-theme", state.theme);
      },
    }
  )
);
