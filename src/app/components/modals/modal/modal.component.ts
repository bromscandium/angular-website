import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CancelButtonComponent } from '../../buttons/cancel-button/cancel-button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CancelButtonComponent],
  template: `
    @if (isOpen) {
      <div class="modal-backdrop" (click)="handleBackdropClick($event)">
        <div class="modal-container">
          <div class="modal-header">
            <app-cancel-button (onClick)="onClose.emit()" />
            <h2 class="modal-title">{{ title }}</h2>
            <div class="modal-header-spacer"></div>
          </div>
          <div class="modal-content">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Input() title = '';
  @Output() onClose = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (this.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'unset';
  }

  handleBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose.emit();
    }
  }
}
