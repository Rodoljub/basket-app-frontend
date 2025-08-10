import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketMovementDialogComponent } from './basket-movement-dialog.component';

describe('BasketMovementDialogComponent', () => {
  let component: BasketMovementDialogComponent;
  let fixture: ComponentFixture<BasketMovementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketMovementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketMovementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
