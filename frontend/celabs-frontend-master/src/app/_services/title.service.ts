import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private title = new BehaviorSubject<String>('Cargando nombre de vista...');
  private title$ = this.title.asObservable();

  constructor() { }

  setTitle(title: String) {
    this.title.next(title);
  }

  getTitle(): Observable<String> {
    return this.title$;
  }
}
