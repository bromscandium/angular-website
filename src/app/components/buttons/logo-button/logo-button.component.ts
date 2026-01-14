import { Component, Output, EventEmitter } from '@angular/core';
import { LogoIconComponent } from '../../icons/logo-icon/logo-icon.component';
import { IconSizeService } from '../../../services/icon-size.service';

@Component({
  selector: 'app-logo-button',
  standalone: true,
  imports: [LogoIconComponent],
  template: `
    <button (click)="onClick.emit()" aria-label="Settings">
      <app-logo-icon [width]="iconSize" [height]="iconSize" />
    </button>
  `
})
export class LogoButtonComponent {
  @Output() onClick = new EventEmitter<void>();
  iconSize: number;

  constructor(private iconSizeService: IconSizeService) {
    this.iconSize = this.iconSizeService.getIconSize(40, 20);
  }
}
