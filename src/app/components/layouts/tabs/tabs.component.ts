import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { TabRowComponent } from '../../rows/tab-row/tab-row.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [RouterOutlet, TabRowComponent],
  template: `
    <div class="tabs-layout">
      <app-tab-row [city]="city" />
      <router-outlet />
    </div>
  `,
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  city = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.city = params['city'] || '';
    });
  }
}
