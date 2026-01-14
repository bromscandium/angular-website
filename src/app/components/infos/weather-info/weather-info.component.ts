import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-weather-info',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="weather-info">
      <div class="info-item">
        <span class="info-label">Wind:</span>
        <span class="info-value">{{ wind }} {{ windUnit }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Humidity:</span>
        <span class="info-value">{{ humidity }}%</span>
      </div>
      <div class="info-item">
        <span class="info-label">Air Quality:</span>
        <span class="info-value" [ngClass]="getAirQualityClass(airQuality)">
          {{ airQuality || 'Loading...' }}
        </span>
      </div>
    </div>
  `,
  styleUrl: './weather-info.component.css'
})
export class WeatherInfoComponent {
  @Input() wind = 0;
  @Input() humidity = 0;
  @Input() airQuality = '';
  @Input() windUnit = '';

  getAirQualityClass(quality: string): string {
    if (quality === 'Good') return 'quality-good';
    if (quality === 'Moderate') return 'quality-moderate';
    return 'quality-poor';
  }
}
