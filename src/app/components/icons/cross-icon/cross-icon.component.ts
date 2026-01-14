import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cross-icon',
  standalone: true,
  template: `
    <img
      src="assets/icons/ui/cross.svg"
      [width]="width"
      [height]="height"
      [alt]="alt"
    />
  `
})
export class CrossIconComponent {
  @Input() width = 50;
  @Input() height = 50;
  @Input() alt = 'Cross';
}
