import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IconSizeService implements OnDestroy {
  private resizeListener: (() => void) | null = null;

  getIconSize(defaultSize: number = 24, mobileSize: number = 18): number {
    return window.innerWidth <= 540 ? mobileSize : defaultSize;
  }

  createIconSizeObservable(defaultSize: number = 24, mobileSize: number = 18): Observable<number> {
    const subject = new BehaviorSubject<number>(this.getIconSize(defaultSize, mobileSize));

    const updateSize = () => {
      subject.next(window.innerWidth <= 540 ? mobileSize : defaultSize);
    };

    window.addEventListener('resize', updateSize);
    this.resizeListener = updateSize;

    return subject.asObservable();
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }
}
