

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Driver } from '../../../drivers/driver.model';

@Component({
  selector: 'app-driver-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
   templateUrl: './driver-select.component.html',
  styleUrl: './driver-select.component.scss'
 
})
export class DriverSelectComponent {
  @Input() drivers: Driver[] = [];
  @Input() selectedDriverId: number | null = null;
  @Output() driverSelected = new EventEmitter<number>();
}
