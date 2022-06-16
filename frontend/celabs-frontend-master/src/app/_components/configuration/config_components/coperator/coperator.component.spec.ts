import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoperatorComponent } from './coperator.component';

describe('CoperatorComponent', () => {
  let component: CoperatorComponent;
  let fixture: ComponentFixture<CoperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
