import { Component, Input } from '@angular/core';
import { getUnitsSetting } from '../../../store/units';

@Component({
  selector: 'app-temperature-info',
  standalone: true,
  template: `
    <div class="temperature-info">
      <div class="weather-icon-large">
        <img [src]="iconUrl" alt="Weather icon" class="weather-icon-img" />
      </div>
      <div class="temperature-display">
        <span class="temperature-value">
          {{ temperature }}{{ unitSymbol }}
        </span>
        <span class="real-feel">
          RealFeel: {{ realFeel }}{{ unitSymbol }}
        </span>
      </div>
    </div>
  `,
  styleUrl: './temperature-info.component.css'
})
export class TemperatureInfoComponent {
  @Input() temperature = 0;
  @Input() realFeel = 0;
  @Input() iconUrl = '';

  get unitSymbol(): string {
    const units = getUnitsSetting();
    return units === 'imperial' ? '°F' : '°C';
  }
}
