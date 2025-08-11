import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouteStoreService } from '../route-store.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaceService } from '../../places/place.service';

@Component({
  selector: 'app-route-planner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './route-planner.component.html',
  styleUrl: './route-planner.component.scss',
})
export class RoutePlannerComponent implements OnInit, OnChanges {
  @Input() routeId!: number;
  routeStores: any[] = [];

  places: any[] = [];
  selectedPlaceId: number | null = null;

  constructor(private rsService: RouteStoreService,
    private placeService: PlaceService
  ) {}

  ngOnInit() {
    this.load();
    this.loadPlaces();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['routeId']) {
      console.log('routeId changed', changes['routeId'].currentValue)
      this.load();
    }
  }

  load() {
    this.rsService.getByRoute(this.routeId).subscribe((data) => {
      this.routeStores = data;
    });
  }

  loadPlaces() {
  this.placeService.getWarehousesAndStores().subscribe(data => this.places = data);
}

addPlaceToRoute() {
  if (!this.selectedPlaceId || !this.routeId) return;

  this.rsService.create({
    routeId: this.routeId,
    placeId: this.selectedPlaceId,
  }).subscribe(() => {
    this.selectedPlaceId = null;
    this.load();
  });
}

  remove(id: number) {
    this.rsService.remove(id).subscribe(() => this.load());
  }

  move(id: number, direction: 'up' | 'down') {
    const index = this.routeStores.findIndex((rs) => rs.id === id);
    const target = direction === 'up' ? index - 1 : index + 1;

    if (target < 0 || target >= this.routeStores.length) return;

    const currentOrder = this.routeStores[index].order;
    const newOrder = this.routeStores[target].order;

    this.rsService.moveToOrder(id, newOrder).subscribe(() => this.load());
  }
}
