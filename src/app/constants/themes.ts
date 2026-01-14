export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;

export type ThemeType = typeof THEMES[keyof typeof THEMES];
