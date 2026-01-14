import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arrow-left-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="width"
      [attr.height]="height"
      viewBox="0 0 24 24"
      fill="none"
      [attr.stroke]="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      display="block"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  `
})
export class ArrowLeftIconComponent {
  @Input() width = 24;
  @Input() height = 24;
  @Input() color = 'currentColor';
}
