import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";

// basket.service.ts
@Injectable({ providedIn: 'root' })
export class BasketService {
  private apiUrl = `${environment.apiUrl}/movements`;

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
