import { STORAGE_KEYS } from '../constants/local-storage';

export type TimeFormat = '12' | '24';

export const getTimeFormatSetting = (): TimeFormat => {
  const value = localStorage.getItem(STORAGE_KEYS.TIME_FORMAT);
  return (value as TimeFormat) || '12';
};

export const setTimeFormatSetting = (format: TimeFormat): void => {
  localStorage.setItem(STORAGE_KEYS.TIME_FORMAT, format);
};
