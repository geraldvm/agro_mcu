import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/_services/title.service';
import { NgbDateStruct, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGeneratorService } from 'src/app/_services/forms/form-generator.service';
import { FormToJsonService } from 'src/app/_services/forms/form-to-json.service';
import { FormValidatorService } from 'src/app/_services/forms/form-validator.service';
import { FormGroup, Form } from '@angular/forms';


interface Semester {
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-semestre',
  templateUrl: './semestre.component.html',
  styleUrls: ['./semestre.component.css']
})
export class SemestreComponent implements OnInit {

  semesterConfigForm: FormGroup;

  constructor(
    private titleService: TitleService,
    private formGenerator: FormGeneratorService,
    private formToJson: FormToJsonService,
    private formValidator: FormValidatorService
  ) {
    this.titleService.setTitle('');
  }
  modelEnd: NgbDateStruct;
  modelStart: NgbDateStruct;
  semestre: Semester;

  ngOnInit(): void {
    this.semestre = this.getInterval();
    this.semesterConfigForm = this.formGenerator.createSemesterConfigForm(this.semestre.startDate, this.semestre.endDate);
  }

  validDates(): boolean {
    return this.formValidator.checkStartEndDateValid(this.start.value, this.end.value);
  }

  //GETs
  getInterval(): Semester {
    return { startDate: "2020-01-10", endDate: "2020-08-10" }
  }

  //POSTs
  post() {
    const json = this.formToJson.createConfigSemesterJson(
      this.start.value,
      this.end.value
    );
    alert('Json generado:\n' + JSON.stringify(json));
  }

  get start() {
    return this.semesterConfigForm.get('start');
  }

  get end() {
    return this.semesterConfigForm.get('end');
  }
}
