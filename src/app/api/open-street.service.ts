export const getOSMTileUrl = (z: string, x: string, y: string): string => {
  return `https://{s}.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}.png`;
};
