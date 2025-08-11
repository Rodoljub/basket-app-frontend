import { Component } from '@angular/core';
import { DriverService } from '../../drivers/driver.service';
import { PlaceService } from '../../places/place.service';
import { RouteService } from '../route.service';
import { RouteStoreService } from '../route-store.service';
import { BasketService } from './basket-input/basket.service';
import {
  InventoryService,
  Inventory,
  InventoryResponse,
} from '../../inventory/inventory.service';
import { Driver } from '../../drivers/driver.model';
import { Place } from '../../places/place.model';
import { RouteStore } from '../route-store.model';

import { CommonModule } from '@angular/common';
import { DriverSelectComponent } from './driver-select/driver-select.component';
import { VanSelectComponent } from './van-select/van-select.component';
import { RouteSelectComponent } from './route-select/route-select.component';
import { ShiftSummaryComponent } from './shift-summary/shift-summary.component';
import { PlaceListComponent } from './shift-place-list/shift-place-list.component';
import { BasketMovementDialogComponent } from './basket-movement-dialog/basket-movement-dialog.component';

const initialInventoryResponse: InventoryResponse = {
  placeId: '',
  inventory: [],
};

@Component({
  selector: 'app-route-shift',
  standalone: true,
  imports: [
    CommonModule,
    DriverSelectComponent,
    VanSelectComponent,
    RouteSelectComponent,
    ShiftSummaryComponent,
    PlaceListComponent,
    BasketMovementDialogComponent,
  ],
  templateUrl: './route-shift.component.html',
  styleUrls: ['./route-shift.component.scss'],
})
export class RouteShiftComponent {
  drivers: Driver[] = [];
  vans: Place[] = [];
  routes: any[] = [];
  places: RouteStore[] = [];

  selectedDriverId: number | null = null;
  selectedVanId: number | null = null;
  selectedRouteId: number | null = null;
  selectedPlace: RouteStore | null = null;

  shiftStarted = false;
  currentInventory: InventoryResponse = initialInventoryResponse;

  vanInventory: InventoryResponse = { placeId: '', inventory: [] };

  isBasketInputOpen = false;
  get showBasketInputModal(): boolean {
    return this.isBasketInputOpen;
  }

  constructor(
    private driverService: DriverService,
    private placeService: PlaceService,
    private routeService: RouteService,
    private routeStoreService: RouteStoreService,
    private basketService: BasketService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    this.loadDrivers();
    this.loadVans();
    this.loadRoutes();

    this.inventoryService.inventory$.subscribe((inv) => {
      if (inv.placeId === String(this.selectedVanId)) {
        this.vanInventory = inv;
      }
      if (inv.placeId === String(this.selectedPlace?.place.id)) {
        this.currentInventory = inv;
      }
    });

    this.loadStateFromStorage();
  }

  loadDrivers() {
    this.driverService.getDrivers().subscribe((data) => (this.drivers = data));
  }

  loadVans() {
    this.placeService.getByType('VAN').subscribe((data) => (this.vans = data));
  }

  loadRoutes() {
    this.routeService.getAll().subscribe((data) => (this.routes = data));
  }

  getDriverName(id: number) {
    return this.drivers.find((d) => d.id === id)?.name || '';
  }
  getVanPlate(id: number) {
    return this.vans.find((v) => v.id === id)?.name || '';
  }
  getRouteName(id: number) {
    return this.routes.find((r) => r.id === id)?.name || '';
  }

  loadPlaces() {
    if (!this.selectedRouteId) {
      this.places = [];
      return;
    }
    this.routeStoreService
      .getByRoute(this.selectedRouteId)
      .subscribe((data) => {
        this.places = data;
        this.restoreSelectedPlaceFromStorage();
        // this.saveStateToStorage()
      });
  }

  getInventorySummary(placeId: number): boolean {
    console.log('inventory ', this.currentInventory);
    return Number(this.currentInventory.placeId) === placeId ? true : false;
  }

  getBasketCount(placeId: number, basketType: 'BIG' | 'SMALL'): number {
    return this.currentInventory.inventory
      .filter((inv) => inv.basketType === basketType)
      .reduce((sum, inv) => sum + inv.quantity, 0);
  }

  onDriverSelected() {
    if (this.shiftStarted) return;
    this.selectedRouteId = null;
    this.places = [];
    this.selectedPlace = null;
    this.saveStateToStorage();
  }

  onVanSelected(vanId: number) {
    this.selectedVanId = vanId;
    if (this.selectedDriverId) {
      this.driverService
        .updateDriver(this.selectedDriverId, { vanId })
        .subscribe(() => {
          console.log('Driver van updated');
          this.loadDrivers();
          this.saveStateToStorage();
        });
    }
    this.loadVanInventory(vanId);
  }

  startShift() {
    if (this.selectedDriverId && this.selectedVanId && this.selectedRouteId) {
      this.shiftStarted = true;
      this.selectedPlace = null;
      this.saveStateToStorage();
    }
  }

  loadVanInventory(vanId: number) {
    this.inventoryService.loadInventoryForPlace(vanId);
    // Subscribe to inventory observable to update vanInventory when loaded:
  }

  getVanBasketCount(basketType: 'BIG' | 'SMALL'): number {
    // console.log('van basket',  this.vanInventory)
    return this.vanInventory.inventory
      .filter((inv) => inv.basketType === basketType)
      .reduce((sum, inv) => sum + inv.quantity, 0);
  }

  resetSelection() {
    this.selectedDriverId = null;
    this.selectedVanId = null;
    this.selectedRouteId = null;
    this.places = [];
    this.selectedPlace = null;
    this.shiftStarted = false;
    this.saveStateToStorage();
  }

  openPlace(place: RouteStore) {
    if (this.shiftStarted) this.selectedPlace = place;

    console.log('selectedPlace', this.selectedPlace);

    if (this.selectedPlace?.place?.id) {
      this.inventoryService.loadInventoryForPlace(this.selectedPlace.place.id);
      this.saveStateToStorage();
    }
  }

  closePlace() {
    this.selectedPlace = null;
    this.isBasketInputOpen = false;
    this.saveStateToStorage();
  }

  openBasketInput() {
    if (!this.selectedPlace) return;
    this.isBasketInputOpen = true;
  }

  closeBasketInput() {
    this.selectedPlace = null;
    this.isBasketInputOpen = false;
  }

  onBasketInputConfirmed(delta: number) {
    if (
      !this.selectedPlace?.place?.id ||
      !this.selectedRouteId ||
      !this.selectedDriverId
    )
      return;
    this.basketService
      .createSimplifiedMovement(
        this.selectedPlace.place.id,
        this.selectedRouteId,
        this.selectedDriverId,
        'BIG',
        delta
      )
      .subscribe((res) => {
        console.log('Movement recorded', res);
        if (this.selectedVanId) {
          this.loadVanInventory(this.selectedVanId);
        }

        // Reload place inventory as well
        if (this.selectedPlace?.place.id) {
          this.inventoryService.loadInventoryForPlace(
            this.selectedPlace.place.id
          );
        }
      });
    this.closeBasketInput();
  }

  saveStateToStorage() {
    const state = {
      selectedDriverId: this.selectedDriverId,
      selectedVanId: this.selectedVanId,
      selectedRouteId: this.selectedRouteId,
      shiftStarted: this.shiftStarted,
      selectedPlaceId: this.selectedPlace?.place.id ?? null,
    };
    localStorage.setItem('routeShiftState', JSON.stringify(state));
  }

  loadStateFromStorage() {
    const saved = localStorage.getItem('routeShiftState');
    if (saved) {
      const state = JSON.parse(saved);
      this.selectedDriverId = state.selectedDriverId;
      this.selectedVanId = state.selectedVanId;
      this.selectedRouteId = state.selectedRouteId;
      this.shiftStarted = state.shiftStarted;
      if (this.selectedRouteId) {
        this.loadPlaces();
      }
      if (state.selectedPlaceId) {
        // find place by id and set selectedPlace
        const place = this.places.find(
          (p) => p.place.id === state.selectedPlaceId
        );
        if (place) {
          this.selectedPlace = place;
          this.inventoryService.loadInventoryForPlace(place.place.id);
        }
      }
    }
  }

  restoreSelectedPlaceFromStorage() {
    const saved = localStorage.getItem('routeShiftState');
    if (!saved) return;

    const state = JSON.parse(saved);
    if (state.selectedPlaceId) {
      const place = this.places.find(
        (p) => p.place.id === state.selectedPlaceId
      );
      if (place) {
        this.selectedPlace = place;
        this.inventoryService.loadInventoryForPlace(place.place.id);
      }
    }
  }
}
