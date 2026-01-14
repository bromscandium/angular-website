import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ActivityRowComponent } from '../../rows/activity-row/activity-row.component';
import { ACTIVITY_ORDER } from '../../../constants/activities';
import { buildActivityData } from '../../../helpers/activities';
import { getUnitsSetting, getWindSpeedUnit } from '../../../store/units';

@Component({
  selector: 'app-activities-modal',
  standalone: true,
  imports: [ModalComponent, ActivityRowComponent],
  template: `
    <app-modal [isOpen]="isOpen" (onClose)="onClose.emit()" title="Activities">
      <div class="activities-grid">
        @for (activity of activities; track activity.id) {
          <app-activity-row
            [icon]="activity.icon"
            [name]="activity.name"
            [value]="getActivityValue(activity)"
            [quality]="getActivityQuality(activity)"
          />
        }
      </div>
    </app-modal>
  `,
  styleUrl: './activities-modal.component.css'
})
export class ActivitiesModalComponent {
  @Input() isOpen = false;
  @Input() weatherData: any = null;
  @Input() aqi: number | null = null;
  @Output() onClose = new EventEmitter<void>();

  activities = ACTIVITY_ORDER;

  getActivityValue(activity: any): string {
    const units = getUnitsSetting();
    const data = buildActivityData(activity, this.weatherData, this.aqi, units, (u) => getWindSpeedUnit(u as any));
    return data.value;
  }

  getActivityQuality(activity: any): string {
    const units = getUnitsSetting();
    const data = buildActivityData(activity, this.weatherData, this.aqi, units, (u) => getWindSpeedUnit(u as any));
    return data.quality;
  }
}
