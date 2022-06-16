import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TitleService } from '../../_services/title.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NotFoundComponent } from './not-found.component';
describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  beforeEach(() => {
    const titleServiceStub = () => ({ setTitle: (string) => ({}) });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NotFoundComponent],
      providers: [{ provide: TitleService, useFactory: titleServiceStub }],
    });
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
