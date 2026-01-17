import { Component, Input, ViewChild, ElementRef, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ArrowLeftIconComponent } from '../../icons/arrow-left-icon/arrow-left-icon.component';
import { ArrowRightIconComponent } from '../../icons/arrow-right-icon/arrow-right-icon.component';
import { ForecastCardComponent } from '../../cards/forecast-card/forecast-card.component';
import { IconSizeService } from '../../../services/icon-size.service';

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

@Component({
  selector: 'app-forecast-section',
  standalone: true,
  imports: [ArrowLeftIconComponent, ArrowRightIconComponent, ForecastCardComponent],
  template: `
    <div class="forecast-page">
      <div class="forecast-container">
        <button
          class="forecast-arrow"
          (click)="scrollLeft()"
          [disabled]="!canScrollLeft"
        >
          <app-arrow-left-icon [width]="iconSize" [height]="iconSize" />
        </button>

        <div class="forecast-scroll" #scrollContainer>
          @for (item of forecastData; track item.dt) {
            <app-forecast-card
              [city]="city"
              [time]="formatLabel(item.dt)"
              [icon]="item.weather[0]?.icon || ''"
              [temp]="item.main.temp"
              [realFeel]="Math.round(item.main.feels_like)"
              [wind]="Math.round(item.wind.speed)"
              [humidity]="item.main.humidity"
              [timestamp]="item.dt"
            />
          }
        </div>

        <button
          class="forecast-arrow"
          (click)="scrollRight()"
          [disabled]="!canScrollRight"
        >
          <app-arrow-right-icon [width]="iconSize" [height]="iconSize" />
        </button>
      </div>
    </div>
  `,
  styleUrl: './forecast-section.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ForecastSectionComponent implements OnInit, OnDestroy {
  @Input() forecastData: ForecastItem[] = [];
  @Input() city = '';
  @Input() formatLabel: (dt: number) => string = () => '';
  @ViewChild('scrollContainer') scrollContainerRef!: ElementRef<HTMLDivElement>;

  currentIndex = 0;
  itemsPerView = 3;
  iconSize: number;

  Math = Math;

  private resizeHandler: () => void;

  constructor(private iconSizeService: IconSizeService) {
    this.iconSize = this.iconSizeService.getIconSize(24, 12);
    this.resizeHandler = this.updateItems.bind(this);
  }

  ngOnInit(): void {
    this.updateItems();
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
  }

  updateItems(): void {
    if (window.innerWidth <= 768) this.itemsPerView = 2;
    else this.itemsPerView = 3;
  }

  get canScrollLeft(): boolean {
    return this.currentIndex > 0;
  }

  get canScrollRight(): boolean {
    return this.currentIndex < this.forecastData.length - this.itemsPerView;
  }

  scrollToIndex(index: number): void {
    const el = this.scrollContainerRef?.nativeElement;
    if (!el) return;

    el.scrollTo({
      left: index * 190,
      behavior: 'smooth',
    });
    this.currentIndex = index;
  }

  scrollLeft(): void {
    this.scrollToIndex(Math.max(0, this.currentIndex - 1));
  }

  scrollRight(): void {
    const maxIndex = Math.max(0, this.forecastData.length - this.itemsPerView);
    this.scrollToIndex(Math.min(maxIndex, this.currentIndex + 1));
  }
}
