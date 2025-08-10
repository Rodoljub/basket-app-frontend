import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanSelectComponent } from './van-select.component';

describe('VanSelectComponent', () => {
  let component: VanSelectComponent;
  let fixture: ComponentFixture<VanSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VanSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VanSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
