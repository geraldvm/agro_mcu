import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Laboratorio } from '../../_models/laboratorio';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  private laboratories: Laboratorio[];

  constructor(private http: HttpClient, private apiService: ApiService) { }

  public getLaboratories(): Laboratorio[] {
    this.http.get(this.apiService.getUrl() + '/getLabs').toPromise().then(res => this.laboratories = res as Laboratorio[]);
    return this.laboratories;
  }

}
