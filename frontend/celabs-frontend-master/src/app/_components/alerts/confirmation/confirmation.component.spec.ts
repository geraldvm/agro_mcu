import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationComponent } from './confirmation.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ConfirmationComponent', () => {
  let activeModal = new NgbActiveModal();
  let component = new ConfirmationComponent(activeModal);

  beforeEach(() => { });

  it('should send success', () => {
    expect(component.confirm()).toBe(true);
  });

  it('should send failure', () => {
    expect(component.cancel()).toBe(false);
  })

});
