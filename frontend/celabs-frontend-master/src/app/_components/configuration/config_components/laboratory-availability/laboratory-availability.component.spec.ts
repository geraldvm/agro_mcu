import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryAvailabilityComponent } from './laboratory-availability.component';

describe('LaboratoryAvailabilityComponent', () => {
  let component: LaboratoryAvailabilityComponent;
  let fixture: ComponentFixture<LaboratoryAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
