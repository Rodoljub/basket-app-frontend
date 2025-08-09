import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// basket.service.ts
@Injectable({ providedIn: 'root' })
export class BasketService {
  private apiUrl = 'http://localhost:3000/api/movements';

  constructor(private http: HttpClient) {}

  createSimplifiedMovement(
    placeId: number,
    routeId: number,
    driverId: number,
    basketType: string,
    delta: number
  ) {
    return this.http.post(`${this.apiUrl}/simplified`, {
      placeId,
      routeId,
      driverId,
      basketType,
      delta
    });
  }
}
