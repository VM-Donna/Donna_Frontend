import type { AccentColor, ThemeMode } from "@/types/dashboard";
import { accentOptions } from "./accents";

export type ThemeSettings = {
  mode: ThemeMode;
  accent: AccentColor;
};

export const defaultThemeSettings: ThemeSettings = {
  mode: "light",
  accent: "navy"
};

export const themeStorageKeys = {
  mode: "donna-theme-mode",
  accent: "donna-accent-color"
} as const;

export function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark";
}

export function isAccentColor(value: string | null): value is AccentColor {
  return accentOptions.some((option) => option.id === value);
}
