import { Injectable } from '@angular/core';
import { VPalmada } from '../../_models/v-palmada.model';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlapService {
  private slaps: VPalmada[];

  constructor(private http: HttpClient, private apiService: ApiService) { }

  public getSlaps(): VPalmada[] {
    this.http.get(this.apiService.getUrl() + '/getSlaps').toPromise().then(res => this.slaps = res as VPalmada[]);
    return this.slaps;
  }


  public updateStatus(id:number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put(this.apiService.getUrl() + '/putSlapState/'+id,httpOptions);
    
  }
}
