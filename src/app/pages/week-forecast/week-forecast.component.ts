import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForecastSectionComponent, ForecastItem } from '../../components/sections/forecast-section/forecast-section.component';
import { WeatherService } from '../../api/weather.service';

@Component({
  selector: 'app-week-forecast',
  standalone: true,
  imports: [ForecastSectionComponent],
  template: `
    @if (loading) {
      <div class="forecast-loading">Loading...</div>
    } @else {
      <app-forecast-section
        [forecastData]="forecastData"
        [city]="city"
        [formatLabel]="formatDay"
      />
    }
  `
})
export class WeekForecastComponent implements OnInit {
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
      const grouped: { [key: string]: any[] } = {};

      data.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(item);
      });

      const dailyForecasts = Object.keys(grouped).map(date =>
        grouped[date].reduce((prev, curr) => {
          const prevHour = new Date(prev.dt * 1000).getHours();
          const currHour = new Date(curr.dt * 1000).getHours();
          return Math.abs(currHour - 12) < Math.abs(prevHour - 12)
            ? curr
            : prev;
        })
      );

      this.forecastData = dailyForecasts.slice(0, 7);
    }

    this.loading = false;
    this.cdr.detectChanges();
  }

  formatDay = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
}
