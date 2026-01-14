import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarInputComponent } from '../../components/inputs/search-bar-input/search-bar-input.component';
import { LastLocationSectionComponent } from '../../components/sections/last-location-section/last-location-section.component';
import { WeatherService } from '../../api/weather.service';
import {
  getSaveLocationsSetting,
  getLastLocations,
  saveLastLocation,
  deleteLastLocation,
  SavedLocation
} from '../../store/locations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarInputComponent, LastLocationSectionComponent],
  template: `
    <div class="home-container">
      <div class="search-section">
        <h1 class="search-title">Search a city for weather...</h1>
        <app-search-bar-input
          [value]="searchValue"
          (onChange)="searchValue = $event"
          (onSearch)="handleSearch()"
          [disabled]="isLoading"
        />
        @if (error) {
          <p class="error-message">{{ error }}</p>
        }
        @if (isLoading) {
          <p class="loading-message">Searching...</p>
        }
      </div>

      @if (showLastLocations) {
        <app-last-location-section
          [locations]="lastLocations"
          (onSelect)="handleLocationSelect($event)"
          (onDelete)="handleLocationDelete($event)"
        />
      }
    </div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  searchValue = '';
  lastLocations: SavedLocation[] = [];
  isLoading = false;
  error = '';

  constructor(
    private router: Router,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    const shouldShowLocations = getSaveLocationsSetting();
    if (shouldShowLocations) {
      this.lastLocations = getLastLocations();
    }
  }

  get showLastLocations(): boolean {
    return getSaveLocationsSetting() && this.lastLocations.length > 0;
  }

  async handleSearch(): Promise<void> {
    if (!this.searchValue.trim()) {
      this.error = 'Please enter a city name';
      return;
    }

    this.isLoading = true;
    this.error = '';

    try {
      const weatherData = await this.weatherService.getWeather(this.searchValue);

      if (!weatherData) {
        this.error = 'City not found. Please try again.';
        this.isLoading = false;
        return;
      }

      const locationData: SavedLocation = {
        id: Date.now().toString(),
        city: weatherData.name,
        country: weatherData.sys.country,
        temperature: Math.round(weatherData.main.temp),
        weatherData: weatherData,
        lastSearched: Date.now(),
        savedUnits: ''
      };

      if (getSaveLocationsSetting()) {
        saveLastLocation(locationData);
        this.lastLocations = [locationData, ...this.lastLocations].slice(0, 10);
      }

      this.router.navigate(['/weather'], {
        queryParams: { city: weatherData.name }
      });
    } catch (err) {
      console.error('Error fetching weather:', err);
      this.error = 'Something went wrong. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  handleLocationSelect(location: SavedLocation): void {
    this.router.navigate(['/weather'], {
      queryParams: { city: location.city }
    });
  }

  handleLocationDelete(locationId: string): void {
    deleteLastLocation(locationId);
    this.lastLocations = this.lastLocations.filter(loc => loc.id !== locationId);
  }
}
