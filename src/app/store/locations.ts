import { STORAGE_KEYS } from '../constants/local-storage';
import { getUnitsSetting } from './units';

export interface SavedLocation {
  id: string;
  city: string;
  country: string;
  temperature: number;
  weatherData: any;
  lastSearched: number;
  savedUnits: string;
}

export const getSaveLocationsSetting = (): boolean => {
  const value = localStorage.getItem(STORAGE_KEYS.SAVE_LOCATIONS);
  return value === null ? true : value === 'true';
};

export const setSaveLocationsSetting = (save: boolean): void => {
  localStorage.setItem(STORAGE_KEYS.SAVE_LOCATIONS, save.toString());
};

export const getLastLocations = (): SavedLocation[] => {
  const locations = localStorage.getItem(STORAGE_KEYS.LAST_LOCATIONS);
  return locations ? JSON.parse(locations) : [];
};

export const saveLastLocation = (location: SavedLocation): void => {
  if (!getSaveLocationsSetting()) return;

  const locations = getLastLocations();
  const currentUnits = getUnitsSetting();

  const locationWithTimestamp: SavedLocation = {
    ...location,
    lastSearched: Date.now(),
    savedUnits: currentUnits,
  };

  const existingIndex = locations.findIndex(
    (loc) => loc.city.toLowerCase() === location.city.toLowerCase()
  );

  if (existingIndex !== -1) {
    const updated = [...locations];
    updated[existingIndex] = locationWithTimestamp;
    const reordered = [
      updated[existingIndex],
      ...updated.slice(0, existingIndex),
      ...updated.slice(existingIndex + 1),
    ];
    localStorage.setItem(STORAGE_KEYS.LAST_LOCATIONS, JSON.stringify(reordered));
  } else {
    const newLocations = [locationWithTimestamp, ...locations].slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.LAST_LOCATIONS, JSON.stringify(newLocations));
  }
};

export const deleteLastLocation = (locationId: string): void => {
  const locations = getLastLocations();
  const filtered = locations.filter((loc) => loc.id !== locationId);
  localStorage.setItem(STORAGE_KEYS.LAST_LOCATIONS, JSON.stringify(filtered));
};
