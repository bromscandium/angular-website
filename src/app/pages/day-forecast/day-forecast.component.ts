import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForecastSectionComponent, ForecastItem } from '../../components/sections/forecast-section/forecast-section.component';
import { WeatherService } from '../../api/weather.service';
import { getTimeFormatSetting } from '../../store/time-formats';

@Component({
  selector: 'app-day-forecast',
  standalone: true,
  imports: [ForecastSectionComponent],
  template: `
    @if (loading) {
      <div class="forecast-loading">Loading...</div>
    } @else {
      <app-forecast-section
        [forecastData]="forecastData"
        [city]="city"
        [formatLabel]="formatTime"
      />
    }
  `
})
export class DayForecastComponent implements OnInit {
  city = '';
  forecastData: ForecastItem[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.city = params['city'] || '';
      if (!this.city) {
        this.router.navigate(['/']);
        return;
      }
      this.fetchForecast();
    });
  }

  async fetchForecast(): Promise<void> {
    this.loading = true;
    this.cdr.detectChanges();

    const data = await this.weatherService.getForecast(this.city);

    if (data?.list) {
      this.forecastData = data.list.slice(0, 8);
    }

    this.loading = false;
    this.cdr.detectChanges();
  }

  formatTime = (timestamp: number): string => {
    const timeFormat = getTimeFormatSetting();
    const date = new Date(timestamp * 1000);

    if (timeFormat === '24') {
      return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
  };
}
