import { Component, Output, EventEmitter } from '@angular/core';
import { BinIconComponent } from '../../icons/bin-icon/bin-icon.component';
import { IconSizeService } from '../../../services/icon-size.service';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [BinIconComponent],
  template: `
    <button (click)="onClick.emit($event)">
      <app-bin-icon [width]="iconSize" [height]="iconSize" />
    </button>
  `
})
export class DeleteButtonComponent {
  @Output() onClick = new EventEmitter<MouseEvent>();
  iconSize: number;

  constructor(private iconSizeService: IconSizeService) {
    this.iconSize = this.iconSizeService.getIconSize(22, 16);
  }
}
