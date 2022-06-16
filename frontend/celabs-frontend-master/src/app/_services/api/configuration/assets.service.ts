import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Activo } from '../../../_models/configuration/activo';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private assets : Activo [];
  private result: string;
  constructor(private http: HttpClient, private apiService: ApiService) { }

  public getActivos () : Activo[] {
    this.http.get(this.apiService.getUrl() + '/getAssets').toPromise().then(res => this.assets = res as Activo[]);
    return this.assets;
  }

  public postActivo (activo : Activo) : string {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    var body = {
      id: activo.id,
      nombre: activo.nombre
    };

    this.http.post(this.apiService.getUrl() + '/postAsset/',body,httpOptions).subscribe(res => {
      res => this.result = res
    }, error => this.result = error);
    return this.result;
    }

  public deleteActivo (id : string) : string {
    this.http.delete(this.apiService.getUrl() + '/deleteAsset/'+id).subscribe(res => {
      res => this.result = res
    }, error => this.result = error);
    return this.result;
  }

  public updateActivo (id : string, activo : Activo) : string {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    var body = {
      id: activo.id,
      nombre: activo.nombre
    };

    this.http.put(this.apiService.getUrl() + '/putAsset/'+id,body,httpOptions).subscribe(res => {
      res => this.result = res
    }, error => this.result = error);
    return this.result;
  }

  




}
