import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Inventory {
  id: number;
  placeId: number;
  basketType: string;
  quantity: number;
}

export interface InventoryResponse {
  placeId: string;
  inventory: Inventory[];
}

const initialInventoryResponse: InventoryResponse = {
  placeId: '',
  inventory: []
};

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = `${environment.apiUrl}/inventories`; // adjust if your API uses another path
//   private apiUrl = `${environment.apiUrl}/inventory`;
 
  private inventorySubject = new BehaviorSubject<InventoryResponse>(initialInventoryResponse);
  inventory$ = this.inventorySubject.asObservable();

  constructor(private http: HttpClient) {}

  loadInventoryForPlace(placeId: number): void {
    this.http.get<InventoryResponse>(`${this.baseUrl}/place/${placeId}`)
      .subscribe((data) => {
        console.log("invservice", data)     
        this.inventorySubject.next(data)
  });
  }

  getInventorySnapshot(): InventoryResponse {
    return this.inventorySubject.getValue();
  }

  getAllInventories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
