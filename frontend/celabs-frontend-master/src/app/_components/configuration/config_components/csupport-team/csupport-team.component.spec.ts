import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsupportTeamComponent } from './csupport-team.component';

describe('CsupportTeamComponent', () => {
  let component: CsupportTeamComponent;
  let fixture: ComponentFixture<CsupportTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsupportTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsupportTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
