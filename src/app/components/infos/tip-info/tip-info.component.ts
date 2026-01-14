import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tip-info',
  standalone: true,
  template: `
    @if (tip) {
      <div class="tip-info">
        <h3 class="tip-title">Small Tip:</h3>
        <p class="tip-text">{{ tip }}</p>
      </div>
    }
  `,
  styleUrl: './tip-info.component.css'
})
export class TipInfoComponent {
  @Input() tip = '';
}
