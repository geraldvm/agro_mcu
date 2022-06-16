import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailuresStatusComponent } from './failures-status.component';

describe('FailuresStatusComponent', () => {
  let component: FailuresStatusComponent;
  let fixture: ComponentFixture<FailuresStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailuresStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailuresStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
