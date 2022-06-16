import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../../_services/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface User {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  permisos: boolean;
}

@Component({
  selector: 'app-approve-teachers-administrative',
  templateUrl: './approve-teachers-administrative.component.html',
  styleUrls: ['./approve-teachers-administrative.component.css']
})

export class ApproveTeachersAdministrativeComponent implements OnInit {

  pendingTeachersAdministratives: User[];

  constructor(private alertService: AlertService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.pendingTeachersAdministratives = this.getPendingTeachersAdministratives();
  }

  confirm(userId: string) {
    this.alertService.confirm(
      'Alerta',
      '¿Está seguro de que desea permitir a ese usuario?').then((result) => {
        if (result) {
          // Success
          this.postAllow(userId);
        } else {
          // No success
          console.log(false);
        }
      }).catch(err => {
        // Error
        console.log(false);
      });
  }
  // POSTs
  postAllow(userId : string) : void {
    console.log(userId);
  }

  // GETs
  getPendingTeachersAdministratives(): User[] {
    return [{
      id: 0,
      nombre: 'Luis Diego Noguera',
      correo: 'lnoguera@itcr.ac.cr',
      rol: 'Docente',
      permisos: false
    }, {
      id: 1,
      nombre: 'Brayan Muñoz Mora',
      correo: 'brianm.bra@estudiantec.cr',
      rol: 'Administrativo',
      permisos: true
    }, {
      id: 2,
      nombre: 'Luis Diego Noguera',
      correo: 'lnoguera@itcr.ac.cr',
      rol: 'Docente',
      permisos: false
    }, {
      id: 3,
      nombre: 'Brayan Muñoz Mora',
      correo: 'brianm.bra@estudiantec.cr',
      rol: 'Administrativo',
      permisos: true
    }, {
      id: 4,
      nombre: 'Luis Diego Noguera',
      correo: 'lnoguera@itcr.ac.cr',
      rol: 'Docente',
      permisos: false
    }, {
      id: 5,
      nombre: 'Brayan Muñoz Mora',
      correo: 'brianm.bra@estudiantec.cr',
      rol: 'Administrativo',
      permisos: true
    }, {
      id: 6,
      nombre: 'Luis Diego Noguera',
      correo: 'lnoguera@itcr.ac.cr',
      rol: 'Docente',
      permisos: false
    }, {
      id: 7,
      nombre: 'Brayan Muñoz Mora',
      correo: 'brianm.bra@estudiantec.cr',
      rol: 'Administrativo',
      permisos: true
    }, {
      id: 8,
      nombre: 'Luis Diego Noguera',
      correo: 'lnoguera@itcr.ac.cr',
      rol: 'Docente',
      permisos: false
    }, {
      id: 9,
      nombre: 'Brayan Muñoz Mora',
      correo: 'brianm.bra@estudiantec.cr',
      rol: 'Administrativo',
      permisos: true
    }];
  }

  /*
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      console.log(this.closeResult);
      return `with: ${reason}`;
    }
  }
  */

}
