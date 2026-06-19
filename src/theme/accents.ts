import type { AccentColor, ThemeMode } from "@/types/dashboard";

export type AccentDefinition = {
  id: AccentColor;
  label: string;
  value: string;
  soft: string;
  contrast: string;
  ring: string;
  darkValue: string;
  darkSoft: string;
  darkRing: string;
};

export const accentOptions: AccentDefinition[] = [
  {
    id: "teal",
    label: "Teal",
    value: "#0f766e",
    soft: "rgba(15, 118, 110, 0.14)",
    contrast: "#ffffff",
    ring: "rgba(15, 118, 110, 0.28)",
    darkValue: "#2dd4bf",
    darkSoft: "rgba(45, 212, 191, 0.16)",
    darkRing: "rgba(45, 212, 191, 0.32)"
  },
  {
    id: "navy",
    label: "Navy",
    value: "#1e3a8a",
    soft: "rgba(30, 58, 138, 0.14)",
    contrast: "#ffffff",
    ring: "rgba(30, 58, 138, 0.28)",
    darkValue: "#60a5fa",
    darkSoft: "rgba(96, 165, 250, 0.16)",
    darkRing: "rgba(96, 165, 250, 0.32)"
  },
  {
    id: "indigo",
    label: "Indigo",
    value: "#4338ca",
    soft: "rgba(67, 56, 202, 0.14)",
    contrast: "#ffffff",
    ring: "rgba(67, 56, 202, 0.28)",
    darkValue: "#818cf8",
    darkSoft: "rgba(129, 140, 248, 0.16)",
    darkRing: "rgba(129, 140, 248, 0.32)"
  },
  {
    id: "emerald",
    label: "Emerald",
    value: "#047857",
    soft: "rgba(4, 120, 87, 0.14)",
    contrast: "#ffffff",
    ring: "rgba(4, 120, 87, 0.28)",
    darkValue: "#34d399",
    darkSoft: "rgba(52, 211, 153, 0.16)",
    darkRing: "rgba(52, 211, 153, 0.32)"
  },
  {
    id: "violet",
    label: "Violet",
    value: "#7c3aed",
    soft: "rgba(124, 58, 237, 0.14)",
    contrast: "#ffffff",
    ring: "rgba(124, 58, 237, 0.28)",
    darkValue: "#a78bfa",
    darkSoft: "rgba(167, 139, 250, 0.16)",
    darkRing: "rgba(167, 139, 250, 0.32)"
  },
  {
    id: "rose",
    label: "Rose",
    value: "#be123c",
    soft: "rgba(190, 18, 60, 0.14)",
    contrast: "#ffffff",
    ring: "rgba(190, 18, 60, 0.28)",
    darkValue: "#fb7185",
    darkSoft: "rgba(251, 113, 133, 0.16)",
    darkRing: "rgba(251, 113, 133, 0.32)"
  },
  {
    id: "amber",
    label: "Amber",
    value: "#b45309",
    soft: "rgba(180, 83, 9, 0.16)",
    contrast: "#ffffff",
    ring: "rgba(180, 83, 9, 0.28)",
    darkValue: "#fbbf24",
    darkSoft: "rgba(251, 191, 36, 0.16)",
    darkRing: "rgba(251, 191, 36, 0.32)"
  }
];

export function getAccentDefinition(accent: AccentColor): AccentDefinition {
  return accentOptions.find((option) => option.id === accent) ?? accentOptions[0];
}

export function getAccentCssVariables(
  accent: AccentColor,
  mode: ThemeMode
): Record<string, string> {
  const definition = getAccentDefinition(accent);
  const isDark = mode === "dark";

  return {
    "--accent": isDark ? definition.darkValue : definition.value,
    "--accent-soft": isDark ? definition.darkSoft : definition.soft,
    "--accent-contrast": definition.contrast,
    "--accent-ring": isDark ? definition.darkRing : definition.ring
  };
}
