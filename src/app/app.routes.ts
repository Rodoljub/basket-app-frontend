import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'places',
    loadComponent: () =>
      import('./features/places/place-list.component').then(m => m.PlaceListComponent),
  },
  {
    path: 'routes',
    loadComponent: () =>
      import('./features/routes/routes.component').then(m => m.RoutesComponent)
  },
  {
    path: 'drivers',
    loadComponent: () =>
      import('./features/drivers/drivers.component').then(m => m.DriversComponent)
  },
  {
    path: '',
    redirectTo: 'routes',
    pathMatch: 'full'
  }
];
