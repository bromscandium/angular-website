import { STORAGE_KEYS } from '../constants/local-storage';
import { UNITS, UnitType } from '../constants/units';

export const getUnitsSetting = (): UnitType => {
  const value = localStorage.getItem(STORAGE_KEYS.UNITS);
  return (value as UnitType) || UNITS.METRIC;
};

export const setUnitsSetting = (units: UnitType): void => {
  if (units !== UNITS.METRIC && units !== UNITS.IMPERIAL) return;
  localStorage.setItem(STORAGE_KEYS.UNITS, units);
};

export const getTemperatureUnitSymbol = (units: UnitType): string => {
  return units === UNITS.IMPERIAL ? '°F' : '°C';
};

export const formatTemperature = (temp: number, units: UnitType): string => {
  const symbol = getTemperatureUnitSymbol(units);
  return `${temp}${symbol}`;
};

export const getWindSpeedUnit = (units: UnitType): string => {
  return units === UNITS.IMPERIAL ? 'mph' : 'km/h';
};
