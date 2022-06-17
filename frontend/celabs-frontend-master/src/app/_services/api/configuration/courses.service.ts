import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medida } from '../../../_models/curso';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  medidas : Medida [];
  medida : Medida;
  constructor(private http: HttpClient, 
    private apiService: ApiService,
    private toastr: ToastrService) { }

  async getMedidas() {
    await this.http.get(this.apiService.getUrl() + '/dev/measures').toPromise().then(res => {
        this.medidas = res as Medida[];
    }, (error: any) => {
      this.toastr.error(error, 'Error!');
    });
    return this.medidas;
  }

  public async getMedidasbyId(id:number) {
    await this.http.get(this.apiService.getUrl() + '/dev/measures/'+ id).toPromise().then(res => {
        this.medida = res as Medida;
    }, (error: any) => {
      this.toastr.error(error, 'Error!');
    });
    return this.medida;
  }
  
  
  public postCourses(medida : Medida) : void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    var med = {
      idMeasure: medida.idMeasure,
      temperature: medida.temperature,
      humidity: medida.humidity,
      timeDate: medida.timeDate
    };

    this.http.post(this.apiService.getUrl() + '/newMeasure',med,httpOptions).subscribe(res => {
        this.toastr.success('Éxito','Curso agregado')
      }, error => this.toastr.error('Error','Vuelva a intentarlo de nuevo'));
    }

}
