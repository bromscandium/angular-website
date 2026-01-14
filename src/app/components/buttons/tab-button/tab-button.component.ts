import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tab-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      class="tab-button"
      [ngClass]="{ active: active }"
      (click)="onClick.emit()"
    >
      {{ label }}
    </button>
  `,
  styleUrl: './tab-button.component.css'
})
export class TabButtonComponent {
  @Input() label = '';
  @Input() active = false;
  @Output() onClick = new EventEmitter<void>();
}
