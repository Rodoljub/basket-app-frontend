import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Inventory {
  id: number;
  placeId: number;
  basketType: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = '/api/inventories'; // adjust if your API uses another path
//   private apiUrl = `${environment.apiUrl}/inventory`;
  private inventorySubject = new BehaviorSubject<Inventory[]>([]);
  inventory$ = this.inventorySubject.asObservable();

  constructor(private http: HttpClient) {}

  loadInventoryForPlace(placeId: number): void {
    this.http.get<Inventory[]>(`${this.baseUrl}/place/${placeId}`)
      .subscribe((data) => this.inventorySubject.next(data));
  }

  getInventorySnapshot(): Inventory[] {
    return this.inventorySubject.getValue();
  }

  getAllInventories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
