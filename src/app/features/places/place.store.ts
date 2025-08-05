import { Injectable, computed, signal } from '@angular/core';
import { Place } from './place.model';
import { PlaceService } from './place.service';

@Injectable({ providedIn: 'root' })
export class PlaceStore {
  private readonly placesSignal = signal<Place[]>([]);
  private readonly loadingSignal = signal(false);

  readonly places = computed(() => this.placesSignal());
  readonly loading = computed(() => this.loadingSignal());

  constructor(private placeService: PlaceService) {
    this.load();
  }

  load() {
    this.loadingSignal.set(true);
    this.placeService.getAll().subscribe({
      next: (data) => this.placesSignal.set(data),
      error: () => this.loadingSignal.set(false),
      complete: () => this.loadingSignal.set(false),
    });
  }

  add(place: Partial<Place>) {
    this.placeService.create(place).subscribe(newPlace => {
      this.placesSignal.update(p => [...p, newPlace]);
    });
  }

  remove(id: number) {
    this.placeService.delete(id).subscribe(() => {
      this.placesSignal.update(p => p.filter(pl => pl.id !== id));
    });
  }
}
