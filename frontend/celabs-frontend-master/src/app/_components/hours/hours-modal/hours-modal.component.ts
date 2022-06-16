import { Component, OnInit, Input } from '@angular/core';
import { FormValidatorService } from '../../../_services/forms/form-validator.service';
import { FormToJsonService } from '../../../_services/forms/form-to-json.service';
import { FormGeneratorService } from '../../../_services/forms/form-generator.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hours-modal',
  templateUrl: './hours-modal.component.html',
  styleUrls: ['./hours-modal.component.css']
})
export class HoursModalComponent implements OnInit {

  @Input() title = 'Historial de medidas';
  @Input() hour: any;

  states: string[];

  hoursForm: FormGroup;

  constructor(
    private formValidator: FormValidatorService,
    private formToJson: FormToJsonService,
    private formGenerator: FormGeneratorService,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.states = this.getStates();
    if (this.hour) {
      this.hoursForm = this.formGenerator.createHoursForm(
        this.hour.fecha, this.hour.horaInicio, this.hour.horaFinal);
    } else {
      this.hoursForm = this.formGenerator.createHoursForm('', '', '');
    }

  }

  validTimes(start: string, end: string): boolean {
    return this.formValidator.checkStartEndTimeValid(start, end);
  }

  successfulPost(json: any): void {
    this.activeModal.close();
    alert('Json generado:\n' + JSON.stringify(json));
  }

  get date() {
    return this.hoursForm.get('date');
  }

  get start() {
    return this.hoursForm.get('start');
  }

  get end() {
    return this.hoursForm.get('end');
  }

  // GETs
  getStates() {
    return ['Aprobado', 'Pendiente'];
  }

  // POST
  post() {
    let json;
    if (!this.hour) {
      json = this.formToJson.createNewHoursJson(
        this.date.value,
        this.start.value,
        this.end.value
      );
    } else {
      json = this.formToJson.createEditHoursJson(
        this.hour.id,
        this.date.value,
        this.start.value,
        this.end.value
      );
    }

    this.successfulPost(json);
  }
}
