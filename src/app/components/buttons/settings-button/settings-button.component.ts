import { Component, Output, EventEmitter } from '@angular/core';
import { GearIconComponent } from '../../icons/gear-icon/gear-icon.component';
import { IconSizeService } from '../../../services/icon-size.service';

@Component({
  selector: 'app-settings-button',
  standalone: true,
  imports: [GearIconComponent],
  template: `
    <button (click)="onClick.emit()" aria-label="Settings">
      <app-gear-icon [width]="iconSize" [height]="iconSize" />
    </button>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class SettingsButtonComponent {
  @Output() onClick = new EventEmitter<void>();
  iconSize: number;

  constructor(private iconSizeService: IconSizeService) {
    this.iconSize = this.iconSizeService.getIconSize(40, 20);
  }
}
