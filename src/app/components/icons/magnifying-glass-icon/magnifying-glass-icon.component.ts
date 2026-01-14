import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-magnifying-glass-icon',
  standalone: true,
  template: `
    <img
      src="assets/icons/ui/magnifying-glass.svg"
      [width]="width"
      [height]="height"
      [alt]="alt"
    />
  `
})
export class MagnifyingGlassIconComponent {
  @Input() width = 50;
  @Input() height = 50;
  @Input() alt = 'MagnifyingGlass';
}
