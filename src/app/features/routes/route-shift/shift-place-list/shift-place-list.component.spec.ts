import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftPlaceListComponent } from './shift-place-list.component';

describe('ShiftPlaceListComponent', () => {
  let component: ShiftPlaceListComponent;
  let fixture: ComponentFixture<ShiftPlaceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftPlaceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftPlaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
