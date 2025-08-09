import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-basket-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket-input.component.html',
  styleUrl: './basket-input.component.scss'
})
export class BasketInputComponent {
 @Output() confirmed = new EventEmitter<number>();

  currentValue = 0;
  inputStr = '';
  isNegative = false;

  quickValues = [-100, -50, -10, -5, -1, 1, 5, 10, 50, 100];
  errorMessage = '';

  appendDigit(digit: string) {
    if (this.inputStr.length >= 5) return; // limit digits length

    if (this.inputStr === '0') {
      this.inputStr = digit; // replace leading zero
    } else {
      this.inputStr += digit;
    }
    this.updateCurrentValue();
  }

  deleteDigit() {
    if (this.inputStr.length > 0) {
      this.inputStr = this.inputStr.slice(0, -1);
      this.updateCurrentValue();
    } else {
      this.currentValue = 0;
    }
  }

  toggleSign() {
    this.isNegative = !this.isNegative;
    this.updateCurrentValue();
  }

  addValue(val: number) {
    let newValue = this.currentValue + val;
    // You can add max/min validation here
    this.currentValue = newValue;
    this.inputStr = Math.abs(newValue).toString();
    this.isNegative = newValue < 0;
    this.errorMessage = '';
  }

  updateCurrentValue() {
    const num = Number(this.inputStr || '0');
    this.currentValue = this.isNegative ? -num : num;
  }

  canConfirm() {
    return this.currentValue !== 0;
  }

  confirm() {
    if (this.canConfirm()) {
      this.confirmed.emit(this.currentValue);
      // reset input
      this.currentValue = 0;
      this.inputStr = '';
      this.isNegative = false;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please enter a non-zero value.';
    }
  }
}
