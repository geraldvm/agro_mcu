import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/_services/title.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApproveTeachersAdministrativeComponent } from './approve-teachers-administrative/approve-teachers-administrative.component'
interface User {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  permisos: boolean;
}

@Component({
  selector: 'app-cteachers-administrative',
  templateUrl: './cteachers-administrative.component.html',
  styleUrls: ['./cteachers-administrative.component.css']
})
export class CTeachersAdministrativeComponent implements OnInit {
  buttonDanger: string = 'btn btn-danger';
  buttonSuccess: string = 'btn btn-success';
  pending: number;

  teachersAdministratives: User[];

  requestsModal: NgbModalRef;

  constructor(private titleService: TitleService, private modalService: NgbModal) {
    this.titleService.setTitle('');
  }

  ngOnInit(): void {
    this.teachersAdministratives = this.getTeachersAdministratives();
    this.pending = this.getPendings();
  }

  openRequests() {
    this.requestsModal = this.modalService.open(
      ApproveTeachersAdministrativeComponent,
      { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    this.requestsModal.result.then(() => { }).catch(() => { });
  }

  checkValue(id: number): void {
    var button = (<HTMLInputElement>document.getElementById('btn' + id));
    var clase = button.className;
    if (clase == this.buttonSuccess) {
      // POST
      // if POST is successful
      if (this.postDeny(id)) {
        document.getElementById('btn' + id).className = this.buttonDanger;
        button.value = 'Denegado';
      }
    } else {
      // POST
      // if POST is successful
      if (this.postAllow(id)) {
        document.getElementById('btn' + id).className = this.buttonSuccess;
        button.value = 'Permitido';
      }
    }
  }

  // GETs
  getPendings () : number {
    return 4;
  }

  getTeachersAdministratives(): User[] {
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

  // POSTs
  postDeny(userId: number): boolean {
    console.log(userId);
    return true;
  }

  postAllow(userId: number): boolean {
    console.log(userId);
    return true;
  }

}
