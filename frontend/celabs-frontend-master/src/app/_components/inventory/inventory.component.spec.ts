import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TitleService } from '../../_services/title.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGeneratorService } from '../../_services/forms/form-generator.service';
import { FormToJsonService } from '../../_services/forms/form-to-json.service';
import { InventoryComponent } from './inventory.component';
describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  beforeEach(() => {
    const titleServiceStub = () => ({ setTitle: (string) => ({}) });
    const ngbModalStub = () => ({ open: (content, object) => ({}) });
    const formGeneratorServiceStub = () => ({
      createInventoryForm: (operator) => ({}),
    });
    const formToJsonServiceStub = () => ({
      createInventoryJson: (
        operator,
        id,
        completeComputers,
        incompleteComputers,
        projectors,
        chairs,
        extinguishers
      ) => ({}),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [InventoryComponent],
      providers: [
        { provide: TitleService, useFactory: titleServiceStub },
        { provide: NgbModal, useFactory: ngbModalStub },
        { provide: FormGeneratorService, useFactory: formGeneratorServiceStub },
        { provide: FormToJsonService, useFactory: formToJsonServiceStub },
      ],
    });
    fixture = TestBed.createComponent(InventoryComponent);
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
      spyOn(component, 'getLaboratories').and.callThrough();
      spyOn(component, 'getOperator').and.callThrough();
      spyOn(component, 'getAmounts').and.callThrough();
      spyOn(component, 'getInventories').and.callThrough();
      spyOn(formGeneratorServiceStub, 'createInventoryForm').and.callThrough();
      component.ngOnInit();
      expect(component.getLaboratories).toHaveBeenCalled();
      expect(component.getOperator).toHaveBeenCalled();
      expect(component.getAmounts).toHaveBeenCalled();
      expect(component.getInventories).toHaveBeenCalled();
      expect(formGeneratorServiceStub.createInventoryForm).toHaveBeenCalled();
    });
  });
  describe('post', () => {
    it('makes expected calls', () => {
      const formToJsonServiceStub: FormToJsonService = fixture.debugElement.injector.get(
        FormToJsonService
      );
      spyOn(component, 'successfulPost').and.callThrough();
      spyOn(formToJsonServiceStub, 'createInventoryJson').and.callThrough();
      component.post();
      expect(component.successfulPost).toHaveBeenCalled();
      expect(formToJsonServiceStub.createInventoryJson).toHaveBeenCalled();
    });
  });
});
