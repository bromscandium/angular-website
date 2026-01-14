export const getAirQualityText = (aqi: number | null | undefined): string => {
  if (!aqi) return "Moderate";
  if (aqi === 1 || aqi === 2) return "Good";
  if (aqi === 3) return "Moderate";
  return "Bad";
};
