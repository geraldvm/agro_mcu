import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../_models/user.model';
import { UsuarioModel } from '../../_models/usuario-model.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private apiService: ApiService) { }

  registerUser(usuario : any){
    
    var reqHeader = new HttpHeaders({ 'No-Auth':'True' });
    return this.http.post(this.apiService.getUrl() + '/User/Register', usuario, {headers: reqHeader});
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.apiService.getUrl() + '/token', data, { headers: reqHeader });
  }

  getUserClaims(){
    return this.http.get(this.apiService.getUrl()+'/GetUserClaims');

  }
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
  


  
}
