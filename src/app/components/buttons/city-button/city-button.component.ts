import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconSizeService } from '../../../services/icon-size.service';

@Component({
  selector: 'app-city-button',
  standalone: true,
  template: `
    <div class="city-button" role="button" tabindex="0" (click)="onClick.emit()">
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
