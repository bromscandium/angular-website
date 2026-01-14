import { Routes } from '@angular/router';
import { HeaderLayoutComponent } from './components/layouts/header-layout/header-layout.component';
import { TabsComponent } from './components/layouts/tabs/tabs.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { DayForecastComponent } from './pages/day-forecast/day-forecast.component';
import { WeekForecastComponent } from './pages/week-forecast/week-forecast.component';

export const routes: Routes = [
  {
    path: '',
    component: HeaderLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'settings', component: SettingsComponent },
      {
        path: '',
        component: TabsComponent,
        children: [
          { path: 'weather', component: WeatherComponent },
          { path: 'day-forecast', component: DayForecastComponent },
          { path: 'week-forecast', component: WeekForecastComponent },
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
