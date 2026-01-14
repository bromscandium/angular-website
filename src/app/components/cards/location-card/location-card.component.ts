import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DeleteButtonComponent } from '../../buttons/delete-button/delete-button.component';
import { formatTemperature } from '../../../store/units';

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [DeleteButtonComponent],
  template: `
    <div class="location-card">
      <div class="location-info" (click)="onSelect.emit()">
        <div class="location-header">
          <h3 class="location-city">{{ city }}</h3>
          <app-delete-button (onClick)="handleDelete()" />
        </div>
        <p class="location-country">{{ country }}</p>
        @if (lastSearched) {
          <p class="location-time">{{ formatDate(lastSearched) }}</p>
        }
      </div>

      <div class="location-weather" (click)="onSelect.emit()">
        <div class="weather-icon">
          @if (icon) {
            <img [src]="icon" alt="Weather" />
          }
        </div>
        <span class="weather-temperature">
          {{ getFormattedTemperature() }}
        </span>
      </div>
    </div>
  `,
  styleUrl: './location-card.component.css'
})
export class LocationCardComponent {
  @Input() city = '';
  @Input() country = '';
  @Input() temperature = 0;
  @Input() icon = '';
  @Input() units = '';
  @Input() lastSearched: number | null = null;
  @Output() onSelect = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  formatDate(timestamp: number | null): string {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return diffMins === 0 ? 'Just now' : `${diffMins}m ago`;
    }
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }
    if (diffDays < 7) {
      return `${diffDays}d ago`;
    }
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  }

  handleDelete(): void {
    this.onDelete.emit();
  }

  getFormattedTemperature(): string {
    return formatTemperature(Math.round(this.temperature), this.units as any);
  }
}
