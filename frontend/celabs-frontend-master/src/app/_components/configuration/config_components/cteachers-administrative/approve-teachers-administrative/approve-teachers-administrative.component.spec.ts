import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTeachersAdministrativeComponent } from './approve-teachers-administrative.component';

describe('ApproveTeachersAdministrativeComponent', () => {
  let component: ApproveTeachersAdministrativeComponent;
  let fixture: ComponentFixture<ApproveTeachersAdministrativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveTeachersAdministrativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTeachersAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
