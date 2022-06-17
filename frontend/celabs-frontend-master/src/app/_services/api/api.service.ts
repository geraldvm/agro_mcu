import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private readonly routeURL: string = 'https://celabsapi.azurewebsites.net/api';
  private readonly routeURL: string = 'http://localhost:3030/api'

  constructor() { }

  getUrl(): string {
    return this.routeURL;
  }

}
