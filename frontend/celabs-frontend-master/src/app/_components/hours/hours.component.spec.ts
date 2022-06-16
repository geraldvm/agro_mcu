import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TitleService } from '../../_services/title.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HoursComponent } from './hours.component';
describe('HoursComponent', () => {
  let component: HoursComponent;
  let fixture: ComponentFixture<HoursComponent>;
  beforeEach(() => {
    const titleServiceStub = () => ({ setTitle: (string) => ({}) });
    const ngbModalStub = () => ({
      open: (hoursModalComponent, object) => ({
        componentInstance: { title: {}, hour: {} },
        result: { then: () => ({ catch: () => ({}) }) },
      }),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HoursComponent],
      providers: [
        { provide: TitleService, useFactory: titleServiceStub },
        { provide: NgbModal, useFactory: ngbModalStub },
      ],
    });
    fixture = TestBed.createComponent(HoursComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getHours').and.callThrough();
      spyOn(component, 'getAdmin').and.callThrough();
      component.ngOnInit();
      expect(component.getHours).toHaveBeenCalled();
      expect(component.getAdmin).toHaveBeenCalled();
    });
  });
});
