import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-tip-row',
  standalone: true,
  template: `
    @if (tip && tip.length) {
      <div class="tip-row">
        <div class="tip-content">
          <h3 class="tip-title">Small Tip:</h3>
          <p class="tip-text">{{ tip.join('') }}</p>
        </div>
      </div>
    }
  `,
  styleUrl: './weather-tip-row.component.css'
})
export class WeatherTipRowComponent {
  @Input() tip: string[] = [];
}
