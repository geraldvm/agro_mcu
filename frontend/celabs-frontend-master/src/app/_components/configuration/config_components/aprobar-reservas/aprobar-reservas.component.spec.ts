import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarReservasComponent } from './aprobar-reservas.component';

describe('AprobarReservasComponent', () => {
  let component: AprobarReservasComponent;
  let fixture: ComponentFixture<AprobarReservasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobarReservasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
