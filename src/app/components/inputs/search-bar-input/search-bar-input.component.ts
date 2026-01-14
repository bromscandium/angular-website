import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MagnifyingGlassIconComponent } from '../../icons/magnifying-glass-icon/magnifying-glass-icon.component';
import { IconSizeService } from '../../../services/icon-size.service';

@Component({
  selector: 'app-search-bar-input',
  standalone: true,
  imports: [FormsModule, MagnifyingGlassIconComponent],
  template: `
    <form class="search-bar" (ngSubmit)="handleSubmit($event)">
      <input
        type="text"
        class="search-input"
        placeholder="Write a city here"
        [(ngModel)]="value"
        (ngModelChange)="onChange.emit($event)"
        [disabled]="disabled"
        name="search"
      />
      <button
        class="search-button"
        [disabled]="disabled"
        type="submit"
      >
        <app-magnifying-glass-icon [width]="iconSize" [height]="iconSize" />
      </button>
    </form>
  `,
  styleUrl: './search-bar-input.component.css'
})
export class SearchBarInputComponent {
  @Input() value = '';
  @Input() disabled = false;
  @Output() onChange = new EventEmitter<string>();
  @Output() onSearch = new EventEmitter<void>();

  iconSize: number;

  constructor(private iconSizeService: IconSizeService) {
    this.iconSize = this.iconSizeService.getIconSize(20, 10);
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.disabled) {
      this.onSearch.emit();
    }
  }
}
