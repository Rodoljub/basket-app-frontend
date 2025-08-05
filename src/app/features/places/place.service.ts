import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Place } from './place.model';

@Injectable({ providedIn: 'root' })
export class PlaceService extends ApiService<Place> {
  protected override url = '/api/places';
}
