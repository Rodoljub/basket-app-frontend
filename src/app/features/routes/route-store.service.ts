// src/app/services/route-store.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteStore } from './route-store.model';
import { Place } from '../places/place.model';

@Injectable({ providedIn: 'root' })
export class RouteStoreService {
  private baseUrl = 'http://localhost:3000/api/routestores'; // adjust if needed

  constructor(private http: HttpClient) {}

  create(data: { routeId: number; placeId: number }) {
  return this.http.post<RouteStore>(`${this.baseUrl}`, data);
}

  getByRoute(routeId: number) {
    return this.http.get<RouteStore[]>(`${this.baseUrl}/by-route/${routeId}`);
  }


  addToRoute(routeId: number, placeId: number) {
    return this.http.post(this.baseUrl, { routeId, placeId });
  }

  insertAtOrder(routeId: number, placeId: number, order: number) {
    return this.http.post(`${this.baseUrl}/insert-at`, { routeId, placeId, order });
  }

  moveToOrder(id: number, newOrder: number) {
    return this.http.patch(`${this.baseUrl}/move-to-order`, { id, newOrder });
  }

  remove(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
