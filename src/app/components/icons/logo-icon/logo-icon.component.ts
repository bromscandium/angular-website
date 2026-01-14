import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo-icon',
  standalone: true,
  template: `
    <img
      src="assets/logo512.png"
      class="logo-icon"
      [width]="width"
      [height]="height"
      [alt]="alt"
    />
  `,
  styleUrl: './logo-icon.component.css'
})
export class LogoIconComponent {
  @Input() width = 50;
  @Input() height = 50;
  @Input() alt = 'Logo';
}
