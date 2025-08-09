import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketInputComponent } from './basket-input.component';

describe('BasketInputComponent', () => {
  let component: BasketInputComponent;
  let fixture: ComponentFixture<BasketInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
