import { Injectable } from '@angular/core';
import { Admin } from '../../_models/admin.model';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private admins: Admin[];

  constructor(private http: HttpClient, private apiService: ApiService) { }

  public getAdmins(): Admin[] {
   
    this.http.get(this.apiService.getUrl() + '/getAdmins').toPromise().then(res => this.admins = res as Admin[]);
    return this.admins;
  }
  public updateAdminAccess(cedula:number, aprobacion:boolean){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put(this.apiService.getUrl() + '/putRoleAdmin/'+cedula+'/'+aprobacion,httpOptions);
    
  }

}
