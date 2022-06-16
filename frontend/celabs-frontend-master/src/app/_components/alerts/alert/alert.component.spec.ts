import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('AlertComponent', () => {

  let activeModal = new NgbActiveModal();
  let component = new AlertComponent(activeModal);

  beforeEach(() => { });

  it('should exit', () => {
    expect(component.exit()).toBe(0);
  });
});
