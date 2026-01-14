import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getWeatherIcon } from '../../../helpers/weather-icon';
import { getUnitsSetting, getWindSpeedUnit } from '../../../store/units';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  template: `
    <div class="forecast-card" (click)="handleClick()">
      <div class="forecast-time">{{ time }}</div>
      <img
        class="forecast-icon"
        [src]="getIconUrl()"
        alt="weather icon"
      />
      <div class="forecast-temp">{{ Math.round(temp) }}°</div>

      <div class="forecast-details">
        <div class="forecast-detail">
          <span class="forecast-label">RealFeel:</span>
          <span class="forecast-value">{{ realFeel }}°</span>
        </div>
        <div class="forecast-detail">
          <span class="forecast-label">Wind:</span>
          <span class="forecast-value">{{ wind }} {{ getWindUnit() }}</span>
        </div>
        <div class="forecast-detail">
          <span class="forecast-label">Humidity:</span>
          <span class="forecast-value">{{ humidity }}%</span>
        </div>
      </div>
    </div>
  `,
  styleUrl: './forecast-card.component.css'
})
export class ForecastCardComponent {
  @Input() city = '';
  @Input() temp = 0;
  @Input() icon = '';
  @Input() time = '';
  @Input() realFeel = 0;
  @Input() wind = 0;
  @Input() humidity = 0;
  @Input() timestamp = 0;

  Math = Math;

  constructor(private router: Router) {}

  handleClick(): void {
    this.router.navigate(['/weather'], {
      queryParams: { city: this.city, timestamp: this.timestamp }
    });
  }

  getIconUrl(): string {
    return getWeatherIcon(this.icon);
  }

  getWindUnit(): string {
    return getWindSpeedUnit(getUnitsSetting());
  }
}
