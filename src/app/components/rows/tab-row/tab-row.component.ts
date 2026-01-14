import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TabButtonComponent } from '../../buttons/tab-button/tab-button.component';
import { tabs } from '../../../constants/tabs';

@Component({
  selector: 'app-tab-row',
  standalone: true,
  imports: [TabButtonComponent],
  template: `
    <div class="tab-row">
      @for (tab of tabs; track tab.path) {
        <app-tab-button
          [label]="tab.label"
          [active]="isActive(tab.path)"
          (onClick)="handleTabClick(tab.path)"
        />
      }
    </div>
  `,
  styleUrl: './tab-row.component.css'
})
export class TabRowComponent {
  @Input() city = '';
  tabs = tabs;

  constructor(private router: Router) {}

  handleTabClick(path: string): void {
    this.router.navigate([path], { queryParams: { city: this.city } });
  }

  isActive(path: string): boolean {
    return this.router.url.split('?')[0] === path;
  }
}
