import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RouteStore } from "./route-store.model";
import { environment } from "../../../environments/environment";

// route.service.ts
@Injectable({ providedIn: 'root' })
export class RouteService {
  private baseUrl = `${environment.apiUrl}/routes` 

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.baseUrl);
  }
  

  getById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }

  create(name: string) {
    return this.http.post<any>(this.baseUrl, { name });
  }

  updateRoute(routeId: number, name: string, driverId: number) {
    return this.http.put<RouteStore>(`${this.baseUrl}/${routeId}`, { name, driverId });
}

patchRoute(routeId: number, changes: { name?: string; driverId?: number }) {
  return this.http.patch<any>(`${this.baseUrl}/${routeId}`, changes);
}

  
}
