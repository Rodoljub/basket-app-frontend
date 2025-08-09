import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteShiftComponent } from './route-shift.component';

describe('RouteShiftComponent', () => {
  let component: RouteShiftComponent;
  let fixture: ComponentFixture<RouteShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteShiftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
