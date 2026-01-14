import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-activity-row',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="activity-row">
      <div class="activity-icon">
        <img [src]="'assets/icons/activities/' + icon + '.svg'" [alt]="name" />
      </div>
      <div class="activity-content">
        <span class="activity-name">{{ name }}:</span>
        <span class="activity-value" [ngClass]="getQualityClass(quality)">
          {{ value }}
        </span>
      </div>
    </div>
  `,
  styleUrl: './activity-row.component.css'
})
export class ActivityRowComponent {
  @Input() icon = '';
  @Input() name = '';
  @Input() value = '';
  @Input() quality = '';

  getQualityClass(quality: string): string {
    if (quality === 'Good' || quality === 'Low') return 'quality-good';
    if (quality === 'Moderate') return 'quality-moderate';
    return 'quality-bad';
  }
}
