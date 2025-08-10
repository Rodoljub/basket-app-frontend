

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shift-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shift-summary.component.html',
  styleUrl: './shift-summary.component.scss'
})
export class ShiftSummaryComponent {
  @Input() driverName = '';
  @Input() vanPlate = '';
  @Input() routeName = '';
  @Input() shiftStarted = false;

  @Output() startShift = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
}
