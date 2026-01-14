import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { getUnitsSetting } from '../store/units';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.weatherApiKey;

  async getWeather(city: string): Promise<any | null> {
    const units = getUnitsSetting();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${units}`;

    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  }

  async getAirQuality(lat: number, lon: number): Promise<number | null> {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      const data = await response.json();
      return data.list[0].main.aqi;
    } catch {
      return null;
    }
  }

  async getForecast(city: string): Promise<any | null> {
    const units = getUnitsSetting();
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${units}`;

    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  }

  getWeatherMapTileUrl(layer: string, z: number, x: number, y: number): string {
    return `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${this.apiKey}`;
  }
}
