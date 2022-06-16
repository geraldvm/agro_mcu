import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CTeachersAdministrativeComponent } from './cteachers-administrative.component';

describe('CTeachersAdministrativeComponent', () => {
  let component: CTeachersAdministrativeComponent;
  let fixture: ComponentFixture<CTeachersAdministrativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CTeachersAdministrativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CTeachersAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
