

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Place } from '../../../places/place.model';

@Component({
  selector: 'app-van-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './van-select.component.html',
  styleUrl: './van-select.component.scss'
})
export class VanSelectComponent {
  @Input() vans: Place[] = [];
  @Input() selectedVanId: number | null = null;
  @Input() enabled = true;
  @Output() vanSelected = new EventEmitter<number>();
}
