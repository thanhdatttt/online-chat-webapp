import type { ThemeState } from "@/types/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create<ThemeState>()(
  // store and manage theme values in local storage
  persist(
    (set, get) => ({
        isDark: false,

        // toggle theme
        toggleTheme: () => {
          // toggle
          const newValue = !get().isDark;
          set({isDark: newValue});

          // update css
          if (newValue) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        },

        // active set theme
        setTheme: (dark) => {
          set({isDark: dark});

          if (dark) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
    }),
    {
      // name in local storage
      name: "theme-storage"
    }
  )
)