export interface MapLayer {
  id: string;
  name: string;
}

export const WEATHER_MAP_LAYERS: Record<string, MapLayer> = {
  CLOUDS: { id: 'clouds', name: 'Clouds' },
  TEMPERATURE: { id: 'temp', name: 'Temperature' },
  PRECIPITATION: { id: 'precipitation_new', name: 'Thunderstorm' },
  WINDSPEED: { id: 'wind_new', name: 'Wind Speed' },
};

export const layersArray: MapLayer[] = [
  { id: WEATHER_MAP_LAYERS['CLOUDS'].id, name: WEATHER_MAP_LAYERS['CLOUDS'].name },
  { id: WEATHER_MAP_LAYERS['TEMPERATURE'].id, name: WEATHER_MAP_LAYERS['TEMPERATURE'].name },
  { id: WEATHER_MAP_LAYERS['PRECIPITATION'].id, name: WEATHER_MAP_LAYERS['PRECIPITATION'].name },
  { id: WEATHER_MAP_LAYERS['WINDSPEED'].id, name: WEATHER_MAP_LAYERS['WINDSPEED'].name },
];
