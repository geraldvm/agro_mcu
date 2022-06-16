import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Activo } from '../../../_models/configuration/activo';
import { Curso } from '../../../_models/curso';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private cursos : Curso [];
  constructor(private http: HttpClient, 
    private apiService: ApiService,
    private toastr: ToastrService) { }

  public getCourses () : Curso[] {
    this.http.get(this.apiService.getUrl() + '/getCourses').toPromise().then(res => this.cursos = res as Curso[]);
    return this.cursos;
  }



  public postCourses(curso : Curso) : void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    var body = {
      id: curso.codigoId,
      nombre: curso.nombre
    };

    this.http.post(this.apiService.getUrl() + '/postCourse/',body,httpOptions).subscribe(res => {
        this.toastr.success('Éxito','Curso agregado')
      }, error => this.toastr.error('Error','Vuelva a intentarlo de nuevo'));
    }

  public deleteActivo (id : string)  {
    this.http.delete(this.apiService.getUrl() + '/deleteCourse/'+id).subscribe(res => {
      this.toastr.success('Éxito','Curso eliminado')
    }, error => this.toastr.error('Error', 'Vuelva a intentarlo de nuevo'));
  }

  public updateActivo (id : string, curso : Curso) : void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    var body = {
      id: curso.codigoId,
      nombre: curso.nombre
    };

    this.http.put(this.apiService.getUrl() + '/putCourse/'+id,body,httpOptions).subscribe(res => {
      this.toastr.success('Éxito','Curso actualizado')
    }, error => this.toastr.error('Error', 'Vuelva a intentarlo de nuevo'));
  }




}
