import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalRowComponent } from '../../components/rows/modal-row/modal-row.component';
import { WeatherTipRowComponent } from '../../components/rows/weather-tip-row/weather-tip-row.component';
import { TemperatureInfoComponent } from '../../components/infos/temperature-info/temperature-info.component';
import { WeatherInfoComponent } from '../../components/infos/weather-info/weather-info.component';
import { ActivitiesModalComponent } from '../../components/modals/activities-modal/activities-modal.component';
import { MapModalComponent } from '../../components/modals/map-modal/map-modal.component';
import { WeatherService } from '../../api/weather.service';
import { getAirQualityText } from '../../helpers/air-quality';
import { getWeatherIcon } from '../../helpers/weather-icon';
import { getWeatherTip } from '../../helpers/weather-tips';
import { getUnitsSetting, getWindSpeedUnit } from '../../store/units';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    ModalRowComponent,
    WeatherTipRowComponent,
    TemperatureInfoComponent,
    WeatherInfoComponent,
    ActivitiesModalComponent,
    MapModalComponent
  ],
  template: `
    @if (loading) {
      <div class="weather-container">Loading...</div>
    } @else if (error || !weatherData) {
      <div class="weather-container">{{ error || 'No data available' }}</div>
    } @else {
      <div class="weather-container">
        <div class="weather-top-row">
          <app-temperature-info
            [temperature]="Math.round(weatherData.main.temp)"
            [realFeel]="Math.round(weatherData.main.feels_like)"
            [iconUrl]="getWeatherIcon(weatherData.weather[0].icon)"
          />
          <app-weather-info
            [wind]="Math.round(weatherData.wind.speed * 3.6)"
            [windUnit]="getWindSpeedUnit(units)"
            [humidity]="weatherData.main.humidity"
            [airQuality]="airQualityData?.text || 'N/A'"
          />
        </div>

        <app-weather-tip-row [tip]="weatherTip" />

        <app-modal-row
          (onDetailsClick)="isDetailsOpen = true"
          (onMapClick)="isMapOpen = true"
        />

        <app-activities-modal
          [isOpen]="isDetailsOpen"
          (onClose)="isDetailsOpen = false"
          [weatherData]="weatherData"
          [aqi]="airQualityData?.aqi ?? null"
        />

        <app-map-modal
          [isOpen]="isMapOpen"
          (onClose)="isMapOpen = false"
          [lat]="latLon.lat"
          [lon]="latLon.lon"
          [city]="city"
        />
      </div>
    }
  `,
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  weatherData: any = null;
  airQualityData: { aqi: number | null; text: string } | null = null;
  loading = true;
  error: string | null = null;
  isDetailsOpen = false;
  isMapOpen = false;
  latLon = { lat: 0, lon: 0 };
  weatherTip: string[] = [];
  city = '';
  timestamp: string | null = null;
  units = getUnitsSetting();

  Math = Math;
  getWeatherIcon = getWeatherIcon;
  getWindSpeedUnit = getWindSpeedUnit;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.city = params['city'] || '';
      this.timestamp = params['timestamp'] || null;
      this.fetchWeather();
    });
  }

  async fetchWeather(): Promise<void> {
    if (!this.city) {
      this.router.navigate(['/']);
      return;
    }

    try {
      this.loading = true;
      this.cdr.detectChanges();

      let data: any;
      let lat: number;
      let lon: number;

      if (this.timestamp) {
        const forecastData = await this.weatherService.getForecast(this.city);
        if (!forecastData) {
          this.error = 'Failed to fetch forecast data';
          this.loading = false;
          this.cdr.detectChanges();
          return;
        }

        const targetData = forecastData.list.find(
          (item: any) => item.dt === parseInt(this.timestamp!)
        );

        if (!targetData) {
          this.error = 'Weather data not found';
          this.loading = false;
          this.cdr.detectChanges();
          return;
        }

        data = { ...targetData, coord: forecastData.city.coord };
        lat = forecastData.city.coord.lat;
        lon = forecastData.city.coord.lon;
      } else {
        data = await this.weatherService.getWeather(this.city);
        if (!data) {
          this.error = 'Failed to fetch weather data';
          this.loading = false;
          this.cdr.detectChanges();
          return;
        }

        lat = data.coord.lat;
        lon = data.coord.lon;
      }

      this.weatherData = data;
      this.latLon = { lat, lon };
      this.weatherTip = getWeatherTip(data, this.units);

      const aqi = await this.weatherService.getAirQuality(lat, lon);
      this.airQualityData = { aqi, text: getAirQualityText(aqi) };
    } catch {
      this.error = 'Something went wrong';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
