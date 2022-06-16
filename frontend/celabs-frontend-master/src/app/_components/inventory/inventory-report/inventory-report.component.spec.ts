import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryReportComponent } from './inventory-report.component';
describe('InventoryReportComponent', () => {
  let component: InventoryReportComponent;
  let fixture: ComponentFixture<InventoryReportComponent>;
  beforeEach(() => {
    const ngbActiveModalStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [InventoryReportComponent],
      providers: [{ provide: NgbActiveModal, useFactory: ngbActiveModalStub }]
    });
    fixture = TestBed.createComponent(InventoryReportComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getInventory').and.callThrough();
      component.ngOnInit();
      expect(component.getInventory).toHaveBeenCalled();
    });
  });
});
