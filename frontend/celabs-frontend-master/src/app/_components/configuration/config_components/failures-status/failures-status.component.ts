import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/_services/title.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { state } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { FormGeneratorService } from 'src/app/_services/forms/form-generator.service';
import { FormToJsonService } from 'src/app/_services/forms/form-to-json.service';

interface Estados {
  estado: string;
}

@Component({
  selector: 'app-failures-status',
  templateUrl: './failures-status.component.html',
  styleUrls: ['./failures-status.component.css']
})
export class FailuresStatusComponent implements OnInit {

  failureStatesForm: FormGroup;
  failureStatesModal: NgbModalRef;

  constructor(
    private titleService: TitleService,
    private modalService: NgbModal,
    private formGenerator: FormGeneratorService,
    private formToJson: FormToJsonService) {
    this.titleService.setTitle('');
    this.failureStatesForm = this.formGenerator.createFailureStatesForm();
  }

  states: Estados[];

  ngOnInit(): void {
    this.states = this.getStates();
  }

  open(content): void {
    this.failureStatesModal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    this.failureStatesModal.result.then(() => {
      this.failureStatesForm.reset();
    }).catch(() => {
      this.failureStatesForm.reset();
    });
  }

  successfulNewState(json: any): void {
    this.failureStatesModal.close();
    this.failureStatesForm.reset();
    alert('Json generado:\n' + JSON.stringify(json));
  }

  get state() {
    return this.failureStatesForm.get('state');
  }

  // GETs
  public getStates() {
    return [
      { estado: 'Pendiente' },
      { estado: 'Atención' }
    ];
  }

  // POSTs
  public post(): void {
    const json = this.formToJson.createFailureStatesJson(
      this.state.value
    );
    this.successfulNewState(json);
  }

  public delete(state): void {
    console.log(state);
  }
}
