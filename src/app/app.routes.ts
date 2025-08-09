import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const appRoutes: Routes = [
  // { path: '', component: LandingPageComponent },  
  {
    path: 'places',
    loadComponent: () =>
      import('./features/places/place-list/place-list.component').then(m => m.PlaceListComponent),
  },
  {
    path: 'routes',
    loadComponent: () =>
      import('./features/routes/route-manager/route-menager.component').then(m => m.RouteMenagerComponent)
  },
  {
    path: 'drivers',
    loadComponent: () =>
      import('./features/drivers/driver-list/driver-list.component').then(m => m.DriverListComponent)
  },

  { path: 'shift',
    loadComponent: () => 
      import('./features/routes/route-shift/route-shift.component').then(m => m.RouteShiftComponent)
    
  },
  {
    path: '*',
    redirectTo: '',
    pathMatch: 'full'
  }
];
