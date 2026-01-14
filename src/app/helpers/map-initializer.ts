import { getOSMTileUrl } from '../api/open-street.service';
import { environment } from '../environments/environment';

declare const L: any;

export const initMap = (LLib: any, container: HTMLElement, lat: number, lon: number): any => {
  const map = LLib.map(container, {
    center: [lat, lon],
    zoom: 10,
    zoomControl: true,
  });

  LLib.tileLayer(getOSMTileUrl('{z}', '{x}', '{y}'), {
    maxZoom: 19,
  }).addTo(map);
  return map;
};

export const addWeatherLayer = (LLib: any, map: any, layerId: string): any => {
  const url = `https://tile.openweathermap.org/map/${layerId}/{z}/{x}/{y}.png?appid=${environment.weatherApiKey}`;
  return LLib.tileLayer(url, {
    opacity: 0.7,
  }).addTo(map);
};

export const loadLeaflet = async (): Promise<void> => {
  if (!(window as any).L) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

    await new Promise<void>((resolve) => {
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }
};
