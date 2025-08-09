import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BasketInputComponent } from './basket-input/basket-input.component';
import { FormsModule } from '@angular/forms';
import { RouteService } from '../route.service';
import { DriverService } from '../../drivers/driver.service';
import { Driver } from '../../drivers/driver.model';
import { PlaceService } from '../../places/place.service';
import { Place } from '../../places/place.model';
import { RouteStore } from '../route-store.model';
import { RouteStoreService } from '../route-store.service';
import { BasketService } from './basket-input/basket.service';
import { Inventory, InventoryService } from '../../inventory/inventory.service';


@Component({
  selector: 'app-route-shift',
  standalone: true,
  imports: [CommonModule, FormsModule, BasketInputComponent],
  templateUrl: './route-shift.component.html',
  styleUrl: './route-shift.component.scss'
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

  currentInventory: Inventory[] = [];
  
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

        this.inventoryService.inventory$.subscribe(inv => {
      this.currentInventory = inv;
    });
  }

  loadDrivers() {
    this.driverService.getDrivers().subscribe(data => this.drivers = data);
  }

  loadVans() {
    this.placeService.getByType('VAN').subscribe(data => this.vans = data);
  }

  loadRoutes() {
    this.routeService.getAll().subscribe(data => this.routes = data);
  }

  onSelectionChange() {
    // Reset dependent states if driver or van changes
    if (this.shiftStarted) return; // prevent changes after shift started

    this.selectedRouteId = null;
    this.places = [];
    this.selectedPlace = null;
  }

  assignDriverToRoute() {
  if (this.selectedRouteId && this.selectedDriverId) {
    const route = this.routes.find(r => r.id === this.selectedRouteId);
    const routeName = route?.name || '';

    this.routeService.updateRoute(this.selectedRouteId, routeName, this.selectedDriverId).subscribe({
      next: updatedRoute => {
        console.log('Route updated with driver:', updatedRoute);
        // Reload places because route might have changed
        this.loadPlaces();
      },
      error: err => {
        console.error('Failed to update route with driver:', err);
      }
    });
  }
}

  onVanSelected() {
  if (this.selectedDriverId && this.selectedVanId) {
    this.driverService.updateDriver(this.selectedDriverId,{ vanId: this.selectedVanId })
      .subscribe({
        next: () => {
          console.log('Driver van updated');
          // Optionally reload drivers to sync UI
          this.loadDrivers();
        },
        error: (err) => {
          console.error('Failed to update driver van', err);
        }
      });
  }
}

  loadPlaces() {
    if (!this.selectedRouteId) {
      this.places = [];
      return;
    }

    this.routeStoreService.getByRoute(this.selectedRouteId).subscribe(data => this.places = data);
  }

  getDriverName(id: number): string {
    const driver = this.drivers.find(d => d.id === id);
    return driver ? driver.name : '';
  }

  getVanPlate(id: number): string {
    const van = this.vans.find(v => v.id === id);
    // return van ? van.plateNumber : '';
    return van ? van.name : ''
  }

  getRouteName(id: number): string {
    const route = this.routes.find(r => r.id === id);
    return route ? route.name : '';
  }

  startShift() {
    if (this.selectedDriverId && this.selectedVanId && this.selectedRouteId) {
      this.assignDriverToRoute()
      this.shiftStarted = true;
      this.selectedPlace = null; // start with no place selected
    }
  }

  resetSelection() {
    this.selectedDriverId = null;
    this.selectedVanId = null;
    this.selectedRouteId = null;
    this.places = [];
    this.selectedPlace = null;
    this.shiftStarted = false;
  }

  openPlace(place: RouteStore) {
    if (!this.shiftStarted) return;
    this.selectedPlace = place;
  }

  closeBasketInput() {
    this.selectedPlace = null;
  }

  onBasketInputConfirmed(delta: number) {
    // console.log(`Basket movement for ${this.selectedPlace?.place.name}:`, basketChange);
    // TODO: send movement to backend here

    if (!this.selectedPlace?.id || !this.selectedRouteId || !this.selectedDriverId) {
    console.error('Missing required selection');
    return;
  }

  this.basketService.createSimplifiedMovement(
    this.selectedPlace.id,
    this.selectedRouteId,
    this.selectedDriverId,
    'BIG', // Later: make dynamic
    delta
  ).subscribe({
    next: (res) => {
      console.log('Movement recorded', res);
      console.log('selectedPlace', this.selectedPlace?.place.id);
      

      if (this.selectedPlace?.place.id) {
  this.inventoryService.loadInventoryForPlace(this.selectedPlace.place.id);
}


    },
    error: (err) => {
      console.error('Error recording movement', err);
    }
  });

    this.closeBasketInput();
  }
}
