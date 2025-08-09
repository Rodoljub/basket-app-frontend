import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// route.service.ts
@Injectable({ providedIn: 'root' })
export class RouteService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>('http://localhost:3000/api/routes');
  }

  getById(id: number) {
    return this.http.get<any>(`http://localhost:3000/api/routes/${id}`)
  }

  create(name: string) {
    return this.http.post<any>('http://localhost:3000/api/routes', { name });
  }
}
