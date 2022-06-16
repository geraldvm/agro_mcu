import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveSlapComponent } from './approve-slap.component';

describe('ApproveSlapComponent', () => {
  let component: ApproveSlapComponent;
  let fixture: ComponentFixture<ApproveSlapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveSlapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveSlapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
