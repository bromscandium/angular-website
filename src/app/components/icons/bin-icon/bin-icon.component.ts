import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bin-icon',
  standalone: true,
  template: `
    <img
      src="assets/icons/ui/bin.svg"
      [width]="width"
      [height]="height"
      [alt]="alt"
    />
  `
})
export class BinIconComponent {
  @Input() width = 50;
  @Input() height = 50;
  @Input() alt = 'Bin';
}
