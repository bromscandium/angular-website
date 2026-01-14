export const UNITS = {
  METRIC: 'metric',
  IMPERIAL: 'imperial'
} as const;

export type UnitType = typeof UNITS[keyof typeof UNITS];
