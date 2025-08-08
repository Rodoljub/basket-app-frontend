import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMenagerComponent } from './route-menager.component';

describe('RouteMenagerComponent', () => {
  let component: RouteMenagerComponent;
  let fixture: ComponentFixture<RouteMenagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteMenagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteMenagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
