import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ArrowLeftIconComponent } from '../../icons/arrow-left-icon/arrow-left-icon.component';
import { IconSizeService } from '../../../services/icon-size.service';

@Component({
  selector: 'app-city-button',
  standalone: true,
  imports: [ArrowLeftIconComponent],
  template: `
    <div class="city-button" role="button" tabindex="0" (click)="onClick.emit()">
      <app-arrow-left-icon [width]="iconSize" [height]="iconSize" />
      <span class="city-button-text">{{ city }}</span>
    </div>
  `,
  styleUrl: './city-button.component.css',
})
export class CityButtonComponent {
  @Input() city = '';
  @Output() onClick = new EventEmitter<void>();
  iconSize: number;

  constructor(private iconSizeService: IconSizeService) {
    this.iconSize = this.iconSizeService.getIconSize(36, 18);
  }
}
