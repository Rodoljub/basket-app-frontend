


import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteStore } from '../../route-store.model';

@Component({
  selector: 'app-place-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shift-place-list.component.html',
  styleUrl: './shift-place-list.component.scss'

})
export class PlaceListComponent {
  @Input() places: RouteStore[] = [];
  @Output() placeSelected = new EventEmitter<RouteStore>();
}

