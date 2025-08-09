import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class ApiService<T> {
  protected http = inject(HttpClient);
  protected abstract url: string;

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  getByType(type: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/by-type?type=${type}`)
  }

  create(data: Partial<T>): Observable<T> {
    return this.http.post<T>(this.url, data);
  }

  update(id: number, data: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
