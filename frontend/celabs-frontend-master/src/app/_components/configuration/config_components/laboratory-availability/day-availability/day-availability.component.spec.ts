import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayAvailabilityComponent } from './day-availability.component';

describe('DayAvailabilityComponent', () => {
  let component: DayAvailabilityComponent;
  let fixture: ComponentFixture<DayAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
