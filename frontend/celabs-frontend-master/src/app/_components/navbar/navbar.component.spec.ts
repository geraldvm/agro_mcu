import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TitleService } from './../../_services/title.service';
import { UserService } from '../../_services/api/user.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  beforeEach(() => {
    const titleServiceStub = () => ({
      getTitle: () => ({ subscribe: (f) => f({}) }),
    });
    const userServiceStub = () => ({
      getUserClaims: () => ({ subscribe: (f) => f({}) }),
    });
    const routerStub = () => ({ navigate: (array) => ({}) });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NavbarComponent],
      providers: [
        { provide: TitleService, useFactory: titleServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: Router, useFactory: routerStub },
      ],
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getUserInfo').and.callThrough();
      component.ngOnInit();
      expect(component.getUserInfo).toHaveBeenCalled();
    });
  });
  describe('getUserInfo', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(userServiceStub, 'getUserClaims').and.callThrough();
      component.getUserInfo();
      expect(userServiceStub.getUserClaims).toHaveBeenCalled();
    });
  });
  describe('logout', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.logout();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
