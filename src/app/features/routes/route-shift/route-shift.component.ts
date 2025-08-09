import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BasketInputComponent } from '../../basket-input/basket-input.component';
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
  routes: RouteStore[] = [];
  filteredRoutes: RouteStore[] = [];

  selectedDriverId: number | null = null;
  selectedVanId: number | null = null;
  selectedRouteId: number | null = null;

  places: RouteStore[] = [];
  selectedPlace: any = null;

  constructor(
    private routeService: RouteService,
    private routeStoreService: RouteStoreService,
    private driverService: DriverService,
    private placeService: PlaceService
  ) {}

  ngOnInit() {
    this.loadDrivers();
    this.loadVans();
    this.loadRoutes();
  }

  loadDrivers() {
    // Load drivers from backend or mock
    this.driverService.getDrivers().subscribe(data => {
      this.drivers = data;
    });
  }

  loadVans() {
    // Load vans from backend or mock
    this.placeService.getByType('VAN').subscribe(data => {
      this.vans = data;
    })
  }

  loadRoutes() {
    // Load all routes from backend or mock
    this.routeService.getAll().subscribe(data => {
      this.routes = data;
    })
    this.filteredRoutes = [];
  }

  onSelectionChange() {
    if (this.selectedDriverId && this.selectedVanId) {
      this.filteredRoutes = this.routes.filter(
        // r => r.driverId === this.selectedDriverId && r.vanId === this.selectedVanId
        r => r.id !== this.selectedRouteId
      );
      this.selectedRouteId = null;
      this.places = [];
    }
  }

  loadPlaces() {
    if (!this.selectedRouteId) {
      this.places = [];
      return;
    }
    // Fetch places (warehouses + stores) for route from backend or mock
    this.routeStoreService.getByRoute(this.selectedRouteId).subscribe(places => {
      this.places = places;
    });
  }

  openPlace(place: any) {
    this.selectedPlace = place;
  }

  closeBasketInput() {
    this.selectedPlace = null;
  }

  onBasketInputConfirmed(basketChange: number) {
    console.log(`Basket movement for ${this.selectedPlace.name}:`, basketChange);
    // Send movement to backend with route, driver, van, place and basketChange info

    // Optionally show success message, reset or close input
    this.closeBasketInput();
  }
}
