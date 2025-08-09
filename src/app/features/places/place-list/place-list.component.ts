import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceStore } from '../place.store';
import { FormsModule } from '@angular/forms';
import { Place, PlaceType } from '../place.model';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-place-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent {
  readonly store = inject(PlaceStore);
  readonly placeTypes = [
    { value: 'WAREHOUSE', label: 'Warehouse' },
    { value: 'STORE', label: 'Store' },
    { value: 'VAN', label: 'Van' },
  ] as const;

  newPlace: Partial<Place> = {
    name: '',
    type: 'STORE',
  };

  add() {
    if (this.newPlace.name && this.newPlace.type) {
      this.store.add(this.newPlace);
      this.newPlace = { name: '', type: 'STORE' };
    }
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this place?')) {
      this.store.remove(id);
    }
  }
}
