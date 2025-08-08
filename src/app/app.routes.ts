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
      import('./features/drivers/drivers.component').then(m => m.DriversComponent)
  },
  {
    path: '*',
    redirectTo: '',
    pathMatch: 'full'
  }
];
