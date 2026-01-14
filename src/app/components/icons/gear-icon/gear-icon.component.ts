import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gear-icon',
  standalone: true,
  template: `
    <img
      src="assets/icons/ui/gear.svg"
      [width]="width"
      [height]="height"
      [alt]="alt"
    />
  `
})
export class GearIconComponent {
  @Input() width = 50;
  @Input() height = 50;
  @Input() alt = 'Settings';
}
