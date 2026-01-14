import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

export interface SettingOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-setting-row',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="setting-row">
      <span class="setting-label">{{ label }}</span>
      <div class="setting-options">
        @for (option of options; track option.value) {
          <button
            class="setting-option"
            [ngClass]="{ active: selectedValue === option.value }"
            (click)="onChange.emit(option.value)"
          >
            {{ option.label }}
          </button>
        }
      </div>
    </div>
  `,
  styleUrl: './setting-row.component.css'
})
export class SettingRowComponent {
  @Input() label = '';
  @Input() options: SettingOption[] = [];
  @Input() selectedValue = '';
  @Output() onChange = new EventEmitter<string>();
}
