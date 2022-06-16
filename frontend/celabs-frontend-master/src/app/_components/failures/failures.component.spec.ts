import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TitleService } from '../../_services/title.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGeneratorService } from '../../_services/forms/form-generator.service';
import { FormToJsonService } from '../../_services/forms/form-to-json.service';
import { FailuresComponent } from './failures.component';
describe('FailuresComponent', () => {
  let component: FailuresComponent;
  let fixture: ComponentFixture<FailuresComponent>;
  beforeEach(() => {
    const titleServiceStub = () => ({ setTitle: (string) => ({}) });
    const ngbModalStub = () => ({ open: (content, object) => ({}) });
    const formGeneratorServiceStub = () => ({
      createFailuresFrom: (arg) => ({}),
    });
    const formToJsonServiceStub = () => ({
      createFailuresJson: (arg, value, id, value2, value3) => ({}),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FailuresComponent],
      providers: [
        { provide: TitleService, useFactory: titleServiceStub },
        { provide: NgbModal, useFactory: ngbModalStub },
        { provide: FormGeneratorService, useFactory: formGeneratorServiceStub },
        { provide: FormToJsonService, useFactory: formToJsonServiceStub },
      ],
    });
    fixture = TestBed.createComponent(FailuresComponent);
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
      spyOn(component, 'getFailures').and.callThrough();
      spyOn(component, 'getStates').and.callThrough();
      spyOn(component, 'getLaboratories').and.callThrough();
      spyOn(component, 'getAssets').and.callThrough();
      spyOn(component, 'getOperator').and.callThrough();
      spyOn(formGeneratorServiceStub, 'createFailuresFrom').and.callThrough();
      component.ngOnInit();
      expect(component.getFailures).toHaveBeenCalled();
      expect(component.getStates).toHaveBeenCalled();
      expect(component.getLaboratories).toHaveBeenCalled();
      expect(component.getAssets).toHaveBeenCalled();
      expect(component.getOperator).toHaveBeenCalled();
      expect(formGeneratorServiceStub.createFailuresFrom).toHaveBeenCalled();
    });
  });
  describe('post', () => {
    it('makes expected calls', () => {
      const formToJsonServiceStub: FormToJsonService = fixture.debugElement.injector.get(
        FormToJsonService
      );
      spyOn(component, 'getOperator').and.callThrough();
      spyOn(component, 'successfulPost').and.callThrough();
      spyOn(formToJsonServiceStub, 'createFailuresJson').and.callThrough();
      component.post();
      expect(component.getOperator).toHaveBeenCalled();
      expect(component.successfulPost).toHaveBeenCalled();
      expect(formToJsonServiceStub.createFailuresJson).toHaveBeenCalled();
    });
  });
});
