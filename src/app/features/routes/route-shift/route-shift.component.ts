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

  constructor(
    private driverService: DriverService,
    private placeService: PlaceService,
    private routeService: RouteService,
    private routeStoreService: RouteStoreService
  ) {}

  ngOnInit() {
    this.loadDrivers();
    this.loadVans();
    this.loadRoutes();
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

  onBasketInputConfirmed(basketChange: number) {
    console.log(`Basket movement for ${this.selectedPlace?.place.name}:`, basketChange);
    // TODO: send movement to backend here

    this.closeBasketInput();
  }
}
