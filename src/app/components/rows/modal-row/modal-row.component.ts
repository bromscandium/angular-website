import { Component, Output, EventEmitter } from '@angular/core';
import { TabButtonComponent } from '../../buttons/tab-button/tab-button.component';

@Component({
  selector: 'app-modal-row',
  standalone: true,
  imports: [TabButtonComponent],
  template: `
    <div class="modal-row">
      <app-tab-button label="Details" (onClick)="onDetailsClick.emit()" />
      <app-tab-button label="Map" (onClick)="onMapClick.emit()" />
    </div>
  `,
  styleUrl: './modal-row.component.css'
})
export class ModalRowComponent {
  @Output() onDetailsClick = new EventEmitter<void>();
  @Output() onMapClick = new EventEmitter<void>();
}
