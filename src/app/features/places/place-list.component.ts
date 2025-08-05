import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceStore } from './place.store';

@Component({
  selector: 'app-place-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="store.loading(); else loaded">Loading...</div>
    <ng-template #loaded>
      <h2>Places</h2>
      <ul>
        <li *ngFor="let place of store.places()">
          {{ place.name }} ({{ place.type }})
          <button (click)="delete(place.id)">Delete</button>
        </li>
      </ul>
    </ng-template>
  `
})
export class PlaceListComponent {
  readonly store = inject(PlaceStore);

  delete(id: number) {
    this.store.remove(id);
  }
}
