import { Component } from '@angular/core';
import { RouteService } from '../route.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoutePlannerComponent } from '../route-planner/route-planner.component';
import { BasketInputComponent } from '../../basket-input/basket-input.component';

@Component({
  selector: 'app-route-menager',
  standalone: true,
  imports: [ CommonModule, FormsModule, RoutePlannerComponent, BasketInputComponent],
  templateUrl: './route-menager.component.html',
  styleUrl: './route-menager.component.scss'
})
export class RouteMenagerComponent {
routes: any[] = [];
  newRouteName = '';
  selectedRouteId: number | null = null;

  constructor(private routeService: RouteService) {}

  onBasketChange(value: number) {
  console.log('Driver entered basket change:', value);
  // send to backend or update movement
}

  ngOnInit() {
    this.loadRoutes();
  }

  loadRoutes() {
    this.routeService.getAll().subscribe((routes) => (this.routes = routes));
  }

  createRoute() {
    if (!this.newRouteName.trim()) return;
    this.routeService.create(this.newRouteName).subscribe((newRoute) => {
      this.routes.push(newRoute);
      this.newRouteName = '';
    });
  }

  selectRoute(routeId: number) {
    this.selectedRouteId = routeId;
  }
}
