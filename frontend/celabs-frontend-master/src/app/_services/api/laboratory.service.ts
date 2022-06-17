import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { DataPar } from '../../_models/laboratorio';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  param: DataPar[];

  constructor(private http: HttpClient, 
    private apiService: ApiService,
    private toastr: ToastrService) { }


  async getParam() {
    await this.http.get(this.apiService.getUrl() + '/datapar').toPromise().then(res => {
        this.param = res as DataPar[];
    }, (error: any) => {
      this.toastr.error(error, 'Error!');
    });
    return this.param;
  }  

  async updateParam(body) {
    await this.http.put(this.apiService.getUrl() + '/updateDatapar/1',body).toPromise().then(res => {
        this.param = res as DataPar[];
    }, (error: any) => {
      this.toastr.error(error, 'Error!');
    });
    return this.param;
  } 

  

}
