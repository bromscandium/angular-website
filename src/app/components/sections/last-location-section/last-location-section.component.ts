import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { LocationCardComponent } from '../../cards/location-card/location-card.component';
import { ArrowLeftIconComponent } from '../../icons/arrow-left-icon/arrow-left-icon.component';
import { ArrowRightIconComponent } from '../../icons/arrow-right-icon/arrow-right-icon.component';
import { IconSizeService } from '../../../services/icon-size.service';
import { getWeatherIcon } from '../../../helpers/weather-icon';
import { SavedLocation } from '../../../store/locations';

@Component({
  selector: 'app-last-location-section',
  standalone: true,
  imports: [LocationCardComponent, ArrowLeftIconComponent, ArrowRightIconComponent],
  template: `
    @if (locations.length) {
      <div class="last-locations-section">
        <div class="locations-carousel">
          @if (showArrows) {
            <button
              class="carousel-arrow carousel-arrow-left"
              [disabled]="!canScrollLeft"
              (click)="scrollLeft()"
            >
              <app-arrow-left-icon [width]="iconSize" [height]="iconSize" />
            </button>
          }

          <div
            class="locations-row"
            #scrollContainer
            (scroll)="updateScrollButtons()"
          >
            @for (location of locations; track location.id) {
              <app-location-card
                [city]="location.city"
                [country]="location.country"
                [temperature]="location.temperature"
                [lastSearched]="location.lastSearched"
                [units]="location.savedUnits"
                [icon]="getIconUrl(location)"
                (onSelect)="onSelect.emit(location)"
                (onDelete)="onDelete.emit(location.id)"
              />
            }
          </div>

          @if (showArrows) {
            <button
              class="carousel-arrow carousel-arrow-right"
              [disabled]="!canScrollRight"
              (click)="scrollRight()"
            >
              <app-arrow-right-icon [width]="iconSize" [height]="iconSize" />
            </button>
          }
        </div>
      </div>
    }
  `,
  styleUrl: './last-location-section.component.css'
})
export class LastLocationSectionComponent implements OnInit, OnDestroy {
  @Input() locations: SavedLocation[] = [];
  @Output() onSelect = new EventEmitter<SavedLocation>();
  @Output() onDelete = new EventEmitter<string>();
  @ViewChild('scrollContainer') scrollContainerRef!: ElementRef<HTMLDivElement>;

  currentIndex = 0;
  itemsPerView = 3;
  canScrollLeft = false;
  canScrollRight = false;
  iconSize: number;

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

  get showArrows(): boolean {
    return this.locations.length > this.itemsPerView;
  }

  updateItems(): void {
    if (window.innerWidth <= 768) this.itemsPerView = 2;
    else this.itemsPerView = 3;
    this.updateScrollButtons();
  }

  updateScrollButtons(): void {
    const el = this.scrollContainerRef?.nativeElement;
    if (!el) return;

    this.canScrollLeft = el.scrollLeft > 0;
    this.canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 10;
  }

  scrollToIndex(index: number): void {
    const el = this.scrollContainerRef?.nativeElement;
    if (!el) return;

    const scrollPosition = index * 220;
    el.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    this.currentIndex = index;
  }

  scrollLeft(): void {
    this.scrollToIndex(Math.max(0, this.currentIndex - 1));
  }

  scrollRight(): void {
    const maxIndex = Math.max(0, this.locations.length - this.itemsPerView);
    this.scrollToIndex(Math.min(maxIndex, this.currentIndex + 1));
  }

  getIconUrl(location: SavedLocation): string {
    const icon = location.weatherData?.weather?.[0]?.icon;
    if (icon) {
      return getWeatherIcon(icon);
    }
    return '';
  }
}
