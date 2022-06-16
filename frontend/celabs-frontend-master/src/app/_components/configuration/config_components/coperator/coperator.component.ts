import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/_services/title.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Laboratorio } from 'src/app/_models/laboratorio';
import { FormGeneratorService } from 'src/app/_services/forms/form-generator.service';
import { FormGroup } from '@angular/forms';
import { FormToJsonService } from 'src/app/_services/forms/form-to-json.service';

interface User {
  id: number;
  nombre: string;
  correo: string;
}

@Component({
  selector: 'app-coperator',
  templateUrl: './coperator.component.html',
  styleUrls: ['./coperator.component.css']
})
export class CoperatorComponent implements OnInit {
  buttonDanger: string = 'btn btn-danger';
  buttonSuccess: string = 'btn btn-success';

  states: string[];
  laboratories: Laboratorio[];
  operators: User[];

  addOperatorForm: FormGroup;
  addOperatorModal: NgbModalRef;

  constructor(
    private titleService: TitleService,
    private modalService: NgbModal,
    private formGenerator: FormGeneratorService,
    private formToJson: FormToJsonService) {
    this.titleService.setTitle('');
  }
  ngOnInit(): void {
    this.laboratories = this.getLaboratories();
    this.operators = this.getOperators();
    this.states = this.getStates();
    this.addOperatorForm = this.formGenerator.createAddOperatorForm();
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

  open(content): void {
    this.addOperatorModal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    this.addOperatorModal.result.then(() => {
      this.addOperatorForm.reset();
    }).catch(() => {
      this.addOperatorForm.reset();
    });
  }

  successfulNewOperatorPost(json: any): void {
    this.addOperatorModal.close();
    this.addOperatorForm.reset();
    alert('Json generado:\n' + JSON.stringify(json));
  }

  get name() {
    return this.addOperatorForm.get('name');
  }

  get middleName() {
    return this.addOperatorForm.get('middleName');
  }

  get lastName() {
    return this.addOperatorForm.get('lastName');
  }

  get id() {
    return this.addOperatorForm.get('id');
  }

  get username() {
    return this.addOperatorForm.get('username');
  }

  // GETs
  getStates(): string[] {
    return ['Pendiente de Atención', 'Completado', 'En proceso', 'Reportado'];
  }

  getLaboratories(): Laboratorio[] {
    return [{
      codigo: 'F2-04',
      id: 4
    }, {
      codigo: 'F2-05',
      id: 5
    }, {
      codigo: 'F2-06',
      id: 6
    }, {
      codigo: 'F2-07',
      id: 7
    }, {
      codigo: 'F2-08',
      id: 8
    }, {
      codigo: 'F2-09',
      id: 9
    }];
  }

  getOperators() {
    return [{
      id: 0,
      nombre: 'Luis Diego Noguera',
      correo: 'lnoguera@itcr.ac.cr',
    }, {
      id: 1,
      nombre: 'Brayan Muñoz Mora',
      correo: 'brianm.bra@estudiantec.cr',
    }
    ];
  }

  // POSTs
  postNewOperator(): void {
    const json = this.formToJson.createAddUserJson(
      this.name.value,
      this.middleName.value,
      this.lastName.value,
      this.id.value,
      this.username.value
    );
    this.successfulNewOperatorPost(json);
  }

  postDeny(userId: number): boolean {
    console.log(userId);
    return true;
  }

  postAllow(userId: number): boolean {
    console.log(userId);
    return true;
  }

}
