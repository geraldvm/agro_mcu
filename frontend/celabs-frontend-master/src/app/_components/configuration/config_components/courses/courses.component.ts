import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/_services/title.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormGeneratorService } from 'src/app/_services/forms/form-generator.service';
import { FormToJsonService } from 'src/app/_services/forms/form-to-json.service';
import { CoursesService } from 'src/app/_services/api/courses.service';

interface Cursos {
  codigo: string;
  nombre: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Cursos[];

  addCourseForm: FormGroup;
  addCourseModal: NgbModalRef;

  constructor(
    private titleService: TitleService,
    private modalService: NgbModal,
    private formGenerator: FormGeneratorService,
    private formToJson: FormToJsonService,
    private coursesService: CoursesService) {
    this.titleService.setTitle('');
  }

  ngOnInit(): void {
    this.courses = this.getCourses();
    this.addCourseForm = this.formGenerator.createAddCourseForm();
  }

  open(content): void {
    this.addCourseModal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    this.addCourseModal.result.then(() => {
      this.addCourseForm.reset();
    }).catch(() => {
      this.addCourseForm.reset();
    });
  }

  successfulNewCourse(json: any): void {
    this.addCourseModal.close();
    this.addCourseForm.reset();
    alert('Json generado:\n' + JSON.stringify(json));
  }

  get code() {
    return this.addCourseForm.get('code');
  }

  get name() {
    return this.addCourseForm.get('name');
  }

  // GETs
  public getCourses(): Cursos[] {
    //return this.coursesService
    return [
      { codigo: 'CE1001', nombre: 'Introducción a la programación' },
      { codigo: 'CE1002', nombre: 'Taller de programación' }
    ];
  }

  // POSTs
  public post(): void {
    const json = this.formToJson.createAddCourseJson(
      this.code.value,
      this.name.value
    );
    this.successfulNewCourse(json);
  }

  public delete(course): void {
    console.log(course);
  }

}
