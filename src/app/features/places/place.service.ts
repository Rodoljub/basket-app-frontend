import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Place } from './place.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PlaceService extends ApiService<Place> {
  protected override url = `${environment.apiUrl}/places`
}
