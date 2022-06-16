import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormValidatorService } from '../../../../../_services/forms/form-validator.service';
import { FormToJsonService } from '../../../../../_services/forms/form-to-json.service';
import { FormGeneratorService } from '../../../../../_services/forms/form-generator.service';

@Component({
  selector: 'app-day-availability',
  templateUrl: './day-availability.component.html',
  styleUrls: ['./day-availability.component.css']
})
export class DayAvailabilityComponent implements OnInit {

  @Input() dayId: number;
  @Input() dayName = '';

  changed = false;

  availabilityForm: FormGroup;

  availability: any;

  constructor(
    private formValidator: FormValidatorService,
    private formToJson: FormToJsonService,
    private formGenerator: FormGeneratorService) { }

  ngOnInit(): void {
    this.availability = this.getAvailability();
    this.availabilityForm = this.formGenerator.createDayAvailabilityForm(
      this.availability.start,
      this.availability.end
    );
    this.availabilityForm.valueChanges.subscribe(() => {
      this.changed = true;
    });
  }

  validTimes(start: string, end: string): boolean {
    return this.formValidator.checkStartEndTimeValid(start, end);
  }

  get start() {
    return this.availabilityForm.get('start');
  }

  get end() {
    return this.availabilityForm.get('end');
  }

  // GETs
  // Dado un dayId, retorna la disponibilidad de ese día
  getAvailability() {
    console.log(this.dayId);
    return {
      start: '07:30',
      end: '21:00'
    };
  }

  // POST
  post() {
    const json = this.formToJson.createDayAvailabilityJson(
      this.dayId,
      this.start.value,
      this.end.value
    );

    alert('Json generado:\n' + JSON.stringify(json));

    // POST successful
    this.changed = false;
  }

}
