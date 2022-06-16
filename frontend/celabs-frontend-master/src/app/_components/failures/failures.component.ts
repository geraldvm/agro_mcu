import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/_services/title.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Laboratorio } from 'src/app/_models/laboratorio';
import { FormGroup } from '@angular/forms';
import { FormGeneratorService } from 'src/app/_services/forms/form-generator.service';
import { FormToJsonService } from 'src/app/_services/forms/form-to-json.service';

interface Failure {
  fecha: string;
  hora: string;
  descripcion: string;
  estado: string;
  responsable: string;
  laboratorio: string;
}

@Component({
  selector: 'app-failures',
  templateUrl: './failures.component.html',
  styleUrls: ['./failures.component.scss']
})
export class FailuresComponent implements OnInit {

  states: string[];
  laboratories: Laboratorio[];
  assets: string[];
  failures: Failure[];

  failuresForm: FormGroup;
  failuresModal: NgbModalRef;

  constructor(
    private titleService: TitleService,
    private modalService: NgbModal,
    private formGenerator: FormGeneratorService,
    private formToJson: FormToJsonService) {
    this.titleService.setTitle('Reporte de averías');
  }

  ngOnInit(): void {
    this.failures = this.getFailures();
    this.states = this.getStates();
    this.laboratories = this.getLaboratories();
    this.assets = this.getAssets();
    this.failuresForm = this.formGenerator.createFailuresFrom(
      this.getOperator()
    );
  }

  open(content): void {
    this.failuresModal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    this.failuresModal.result.then(() => {
      this.failuresForm.reset();
    }).catch(() => {
      this.failuresForm.reset();
    });
  }

  successfulPost(json: any): void {
    this.failuresModal.close();
    this.failuresForm.reset();
    alert('Json generado:\n' + JSON.stringify(json));
  }

  get dateTime() {
    return this.failuresForm.get('dateTime');
  }

  get laboratory() {
    return this.failuresForm.get('laboratory');
  }

  get asset() {
    return this.failuresForm.get('asset');
  }

  get description() {
    return this.failuresForm.get('description');
  }

  // GETs
  getOperator() {
    return 'Eduardo Moya';
  }

  getFailures(): Failure[] {
    return [{
      fecha: '12-07-2020',
      hora: '09:30',
      descripcion: 'Computadora sin internet',
      estado: 'Pendiente de Atención',
      responsable: 'Ejemplo Martínez',
      laboratorio: 'F2-04',
    }, {
      fecha: '14-05-2020',
      hora: '19:20',
      descripcion: 'Teclado descompuesto',
      estado: 'En proceso',
      responsable: 'Alternativa Sánchez',
      laboratorio: 'F2-07',
    }];
  }

  getStates() {
    return ['Pendiente de Atención', 'Completado', 'En proceso', 'Reportado'];
  }

  getAssets() {
    return ['CE1001', 'CE1002', 'CE1003'];
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

  // POST
  post() {
    const json = this.formToJson.createFailuresJson(
      this.getOperator(),
      this.dateTime.value,
      this.laboratory.value.id,
      this.asset.value,
      this.description.value
    );

    // Successful post
    this.successfulPost(json);
  }


}
