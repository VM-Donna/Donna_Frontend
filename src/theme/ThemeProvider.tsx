"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { getAccentCssVariables } from "@/theme/accents";
import {
  defaultThemeSettings,
  isAccentColor,
  isThemeMode,
  themeStorageKeys,
  type ThemeSettings
} from "@/theme/theme";
import type { AccentColor, ThemeMode } from "@/types/dashboard";

type ThemeContextValue = ThemeSettings & {
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentColor) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(defaultThemeSettings.mode);
  const [accent, setAccent] = useState<AccentColor>(defaultThemeSettings.accent);

  useEffect(() => {
    const storedMode = window.localStorage.getItem(themeStorageKeys.mode);
    const storedAccent = window.localStorage.getItem(themeStorageKeys.accent);

    if (isThemeMode(storedMode)) {
      setMode(storedMode);
    }

    if (isAccentColor(storedAccent)) {
      setAccent(storedAccent);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const accentVariables = getAccentCssVariables(accent, mode);

    root.dataset.theme = mode;
    root.style.colorScheme = mode;
    Object.entries(accentVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    window.localStorage.setItem(themeStorageKeys.mode, mode);
    window.localStorage.setItem(themeStorageKeys.accent, accent);
  }, [accent, mode]);

  const value = useMemo(
    () => ({
      mode,
      accent,
      setMode,
      setAccent
    }),
    [accent, mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeSettings(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeSettings must be used within ThemeProvider");
  }

  return context;
}
