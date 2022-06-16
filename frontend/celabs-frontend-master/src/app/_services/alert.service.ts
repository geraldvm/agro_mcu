import { Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../_components/alerts/alert/alert.component';
import { ConfirmationComponent } from '../_components/alerts/confirmation/confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {


  constructor(private modalService: NgbModal) { }

  alert(activeModal: NgbActiveModal, title: string, message: string) {
    let modalRef;
    modalRef = this.modalService.open(AlertComponent, { size: 'md' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.result.then((result) => {
      activeModal.close();
    }).catch(err => {
      activeModal.close();
    });
  }

  confirm(title: string, message: string) {
    let modalRef: NgbModalRef;
    modalRef = this.modalService.open(ConfirmationComponent, { size: 'md' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    return modalRef.result;
  }

}
