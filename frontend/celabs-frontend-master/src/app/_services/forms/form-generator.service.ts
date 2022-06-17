import { Injectable } from '@angular/core';
import { FormBuilder, Validators, EmailValidator, FormGroup } from '@angular/forms';
import { Data } from '@angular/router';
import { DataPar } from '../../_models/laboratorio';
import { DateDisplayService } from '../date-display.service';
import { FormValidatorService } from './form-validator.service';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {

  constructor(
    private formBuilder: FormBuilder,
    private dateDisplayService: DateDisplayService) { }

  public createLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      role: ['', [
        Validators.required
      ]]
    });
  }

  public createRegistrationForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      middleName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      id: ['', [
        Validators.required
      ]],
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      role: ['', [
        Validators.required
      ]]
    });
  }

  public createReservationBaseForm(type: string, laboratory: DataPar, event: any): FormGroup {
    return this.formBuilder.group({
      title: ['', [
        Validators.required
      ]],
      type: [type, [
        Validators.required
      ]],
      
      time: [this.dateDisplayService.getSingleDayDisplay(new Date(event.start), new Date(event.end)), [
        Validators.required
      ]]
    });
  }

  public createReservationClassForm(): FormGroup {
    return this.formBuilder.group({
      course: ['', [
        Validators.required
      ]],
      teacher: ['', [
        Validators.required
      ]]
    });
  }

  public createReservationRecurrentForm(weeksRemaining: number): FormGroup {
    return this.formBuilder.group({
      recurrence: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(weeksRemaining),
        Validators.pattern('^[1-9][0-9]*$')
      ]]
    });
  }

  public createReservationPalmadaForm(laboratory: string, operator: string): FormGroup {
    return this.formBuilder.group({
      title: ['', [
        Validators.required
      ]],
      palmada: ['', [
        Validators.required
      ]],
      laboratory: [laboratory, [
        Validators.required
      ]],
      operator: [operator, [
        Validators.required
      ]]
    });
  }

  public createSemesterConfigForm(start: string, end: string): FormGroup {
    return this.formBuilder.group({
      start: [start, [
        Validators.required
      ]],
      end: [end, [
        Validators.required
      ]]
    });
  }

  public createAssetConfigForm(): FormGroup {
    return this.formBuilder.group({
      id: ['', [
        Validators.required
      ]],
      nombre: ['', [
        Validators.required
      ]]
    });
  }

  public createSurveyForm(): FormGroup {
    return this.formBuilder.group({
      satisfaction: ['', [
        Validators.required
      ]]
    });
  }

  public createInventoryForm(operator: string): FormGroup {
    return this.formBuilder.group({
      operator: [operator, [
        Validators.required
      ]],
      laboratory: ['', [
        Validators.required
      ]],
      completeComputers: ['', [
        Validators.required
      ]],
      incompleteComputers: ['', [
        Validators.required
      ]],
      projectors: ['', [
        Validators.required
      ]],
      chairs: ['', [
        Validators.required
      ]],
      extinguishers: ['', [
        Validators.required
      ]]
    });
  }

  public createHoursForm(
    date: string,
    start: string,
    end: string
  ): FormGroup {
    return this.formBuilder.group({
      date: [date, [
        Validators.required
      ]],
      start: [start, [
        Validators.required
      ]],
      end: [end, [
        Validators.required
      ]]
    });
  }

  public createFailuresFrom(operator: string): FormGroup {
    return this.formBuilder.group({
      operator: [operator, [
        Validators.required
      ]],
      dateTime: ['', [
        Validators.required
      ]],
      laboratory: ['', [
        Validators.required
      ]],
      asset: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]]
    });
  }

  public createAddOperatorForm() {
    return this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      middleName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      id: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{4,15}$')
      ]],
      username: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9_-]{4,15}$')
      ]]
    });
  }

  public createProfileForm(
    name: string,
    middleName: string,
    lastName: string,
    email: string
  ) {
    return this.formBuilder.group({
      name: [name, [
        Validators.required
      ]],
      middleName: [middleName, [
        Validators.required
      ]],
      lastName: [lastName, [
        Validators.required
      ]],
      email: [email, [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]]
    });
  }

  public createAddCourseForm() {
    return this.formBuilder.group({
      code: ['', [
        Validators.required
      ]],
      name: ['', [
        Validators.required
      ]]
    });
  }

  public createFailureStatesForm() {
    return this.formBuilder.group({
      state: ['', [
        Validators.required
      ]]
    });
  }

  public createDayAvailabilityForm(
    start: string,
    end: string
  ) {
    return this.formBuilder.group({
      start: start,
      end: end
    });
  }

}
