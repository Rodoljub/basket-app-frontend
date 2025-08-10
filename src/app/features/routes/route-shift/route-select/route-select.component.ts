
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-route-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './route-select.component.html',
  styleUrl: './route-select.component.scss'

})
export class RouteSelectComponent {
  @Input() routes: any[] = [];
  @Input() selectedRouteId: number | null = null;
  @Input() enabled = true;
  @Output() routeSelected = new EventEmitter<number>();
}
