import { STORAGE_KEYS } from '../constants/local-storage';
import { THEMES, ThemeType } from '../constants/themes';

export const getThemeSetting = (): ThemeType => {
  const value = localStorage.getItem(STORAGE_KEYS.THEME);
  return (value as ThemeType) || THEMES.LIGHT;
};

export const setThemeSetting = (theme: ThemeType): void => {
  if (theme !== THEMES.LIGHT && theme !== THEMES.DARK) return;
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  applyTheme(theme);
};

export const applyTheme = (theme: ThemeType): void => {
  document.documentElement.setAttribute('data-theme', theme);
};

export const initializeTheme = (): void => {
  const theme = getThemeSetting();
  applyTheme(theme);
};
