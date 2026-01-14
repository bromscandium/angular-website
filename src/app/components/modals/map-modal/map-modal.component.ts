import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { WEATHER_MAP_LAYERS, layersArray } from '../../../constants/map-layers';
import { initMap, addWeatherLayer, loadLeaflet } from '../../../helpers/map-initializer';

declare const window: any;

@Component({
  selector: 'app-map-modal',
  standalone: true,
  imports: [ModalComponent, NgClass],
  template: `
    <app-modal [isOpen]="isOpen" (onClose)="onClose.emit()" title="Map">
      <div class="map-modal-content">
        <div class="map-container" #mapContainer>
          <div class="map-layer-control">
            <button
              class="layer-control-button"
              (click)="toggleDropdown()"
            >
              <span class="layer-name">{{ getSelectedLayerName() }}</span>
            </button>

            @if (isDropdownOpen) {
              <div class="layer-control-menu">
                @for (layer of layers; track layer.id) {
                  <button
                    class="layer-control-option"
                    [ngClass]="{ active: selectedLayer === layer.id }"
                    (click)="handleLayerSelect(layer.id)"
                  >
                    {{ layer.name }}
                  </button>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </app-modal>
  `,
  styleUrl: './map-modal.component.css'
})
export class MapModalComponent implements OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Input() lat = 0;
  @Input() lon = 0;
  @Input() city = '';
  @Output() onClose = new EventEmitter<void>();
  @ViewChild('mapContainer') mapContainerRef!: ElementRef<HTMLDivElement>;

  selectedLayer = WEATHER_MAP_LAYERS['CLOUDS'].id;
  isDropdownOpen = false;
  layers = layersArray;

  private mapInstance: any = null;
  private weatherLayer: any = null;

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['isOpen'] && this.isOpen) {
      setTimeout(() => this.initializeMap(), 100);
    }

    if (changes['lat'] || changes['lon']) {
      if (this.mapInstance && this.isOpen) {
        this.mapInstance.setView([this.lat, this.lon], 10);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyMap();
  }

  private async initializeMap(): Promise<void> {
    if (!this.mapContainerRef?.nativeElement) return;

    await loadLeaflet();

    this.mapInstance = initMap(
      window.L,
      this.mapContainerRef.nativeElement,
      this.lat,
      this.lon
    );

    this.weatherLayer = addWeatherLayer(
      window.L,
      this.mapInstance,
      this.selectedLayer
    );
  }

  private destroyMap(): void {
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
      this.weatherLayer = null;
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  handleLayerSelect(layerId: string): void {
    this.selectedLayer = layerId;
    this.isDropdownOpen = false;

    if (this.mapInstance) {
      if (this.weatherLayer) {
        this.mapInstance.removeLayer(this.weatherLayer);
      }
      this.weatherLayer = addWeatherLayer(
        window.L,
        this.mapInstance,
        this.selectedLayer
      );
    }
  }

  getSelectedLayerName(): string {
    return this.layers.find(l => l.id === this.selectedLayer)?.name ||
      WEATHER_MAP_LAYERS['CLOUDS'].name;
  }
}
