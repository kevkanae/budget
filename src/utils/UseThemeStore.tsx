import { create } from "zustand";

type ThemeTypes = "light" | "dark";
export interface ThemeStore {
  prefersDarkMode: boolean;
  setMode: (newMode: ThemeTypes) => void;
}

export const useThemeStore = create<ThemeStore>((set) => {
  const theme = localStorage.getItem("theme");
  return {
    prefersDarkMode: !theme ? true : theme === "dark",
    setMode: (newMode: ThemeTypes) =>
      set(() => ({ prefersDarkMode: newMode === "dark" })),
  };
});
