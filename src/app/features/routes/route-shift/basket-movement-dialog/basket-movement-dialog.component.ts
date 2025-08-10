


import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketInputComponent } from '../basket-input/basket-input.component';
import { Place } from '../../../places/place.model';

@Component({
  selector: 'app-basket-movement-dialog',
  standalone: true,
  imports: [CommonModule, BasketInputComponent],
  templateUrl: './basket-movement-dialog.component.html',
  styleUrl: './basket-movement-dialog.component.scss'

})
export class BasketMovementDialogComponent {
  @Input() place: Place | null = null;
  @Output() movementConfirmed = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();
}

