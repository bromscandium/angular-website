import { Component, Output, EventEmitter } from '@angular/core';
import { CrossIconComponent } from '../../icons/cross-icon/cross-icon.component';
import { IconSizeService } from '../../../services/icon-size.service';

@Component({
  selector: 'app-cancel-button',
  standalone: true,
  imports: [CrossIconComponent],
  template: `
    <button (click)="onClick.emit()" aria-label="Cancel">
      <app-cross-icon [width]="iconSize" [height]="iconSize" />
    </button>
  `
})
export class CancelButtonComponent {
  @Output() onClick = new EventEmitter<void>();
  iconSize: number;

  constructor(private iconSizeService: IconSizeService) {
    this.iconSize = this.iconSizeService.getIconSize(40, 20);
  }
}
