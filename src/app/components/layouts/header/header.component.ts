import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingsButtonComponent } from '../../buttons/settings-button/settings-button.component';
import { LogoButtonComponent } from '../../buttons/logo-button/logo-button.component';
import { CancelButtonComponent } from '../../buttons/cancel-button/cancel-button.component';
import { CityButtonComponent } from '../../buttons/city-button/city-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SettingsButtonComponent,
    LogoButtonComponent,
    CancelButtonComponent,
    CityButtonComponent
  ],
  template: `
    <header class="header">
      <div class="header-left">
        @if (isSettings) {
          <app-cancel-button (onClick)="goBack()" />
        } @else {
          <app-settings-button (onClick)="goToSettings()" />
        }
      </div>

      <div class="header-center">
        @if (city) {
          <app-city-button [city]="city" (onClick)="goHome()" />
        } @else {
          <h1 class="header-title">
            {{ isSettings ? 'Settings' : 'Weather App' }}
          </h1>
        }
      </div>

      <div class="header-right">
        <app-logo-button (onClick)="goHome()" />
      </div>
    </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isSettings = false;
  city = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.updateState();
    });
    this.route.queryParams.subscribe(params => {
      this.city = params['city'] || '';
    });
    this.updateState();
  }

  private updateState(): void {
    this.isSettings = this.router.url.startsWith('/settings');
  }

  goBack(): void {
    window.history.back();
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
