import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { DataPar } from '../../_models/laboratorio';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  private laboratories: DataPar[];

  constructor(private http: HttpClient, private apiService: ApiService) { }

  public getLaboratories(): DataPar[] {
    this.http.get(this.apiService.getUrl() + '/getLabs').toPromise().then(res => this.laboratories = res as Laboratorio[]);
    return this.laboratories;
  }

}
