import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormValidatorService } from '../../../_services/forms/form-validator.service';
import { FormToJsonService } from '../../../_services/forms/form-to-json.service';
import { FormGeneratorService } from '../../../_services/forms/form-generator.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HoursModalComponent } from './hours-modal.component';
describe('HoursModalComponent', () => {
  let component: HoursModalComponent;
  let fixture: ComponentFixture<HoursModalComponent>;
  beforeEach(() => {
    const formValidatorServiceStub = () => ({
      checkStartEndTimeValid: (start, end) => ({})
    });
    const formToJsonServiceStub = () => ({
      createNewHoursJson: (value, value1, value2) => ({}),
      createEditHoursJson: (id, value, value1, value2) => ({})
    });
    const formGeneratorServiceStub = () => ({
      createHoursForm: (fecha, horaInicio, horaFinal) => ({})
    });
    const ngbActiveModalStub = () => ({ close: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HoursModalComponent],
      providers: [
        { provide: FormValidatorService, useFactory: formValidatorServiceStub },
        { provide: FormToJsonService, useFactory: formToJsonServiceStub },
        { provide: FormGeneratorService, useFactory: formGeneratorServiceStub },
        { provide: NgbActiveModal, useFactory: ngbActiveModalStub }
      ]
    });
    fixture = TestBed.createComponent(HoursModalComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const formGeneratorServiceStub: FormGeneratorService = fixture.debugElement.injector.get(
        FormGeneratorService
      );
      spyOn(component, 'getStates').and.callThrough();
      spyOn(formGeneratorServiceStub, 'createHoursForm').and.callThrough();
      component.ngOnInit();
      expect(component.getStates).toHaveBeenCalled();
      expect(formGeneratorServiceStub.createHoursForm).toHaveBeenCalled();
    });
  });
  describe('post', () => {
    it('makes expected calls', () => {
      const formToJsonServiceStub: FormToJsonService = fixture.debugElement.injector.get(
        FormToJsonService
      );
      spyOn(component, 'successfulPost').and.callThrough();
      spyOn(formToJsonServiceStub, 'createNewHoursJson').and.callThrough();
      spyOn(formToJsonServiceStub, 'createEditHoursJson').and.callThrough();
      component.post();
      expect(component.successfulPost).toHaveBeenCalled();
      expect(formToJsonServiceStub.createNewHoursJson).toHaveBeenCalled();
      expect(formToJsonServiceStub.createEditHoursJson).toHaveBeenCalled();
    });
  });
});
