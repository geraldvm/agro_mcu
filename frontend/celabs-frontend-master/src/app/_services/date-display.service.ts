import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateDisplayService {

  constructor() { }

  public getSingleDayDisplay(start: Date, end: Date): string {
    const startString = this.getCostaRicaString(start);
    const endString = this.getCostaRicaString(end);
    const endTimeArray = endString.split(' ');
    return startString + ' - ' + endTimeArray[1];
  }

  public getMultipleDayDisplay(start: Date, end: Date): string {
    const startString = this.getCostaRicaString(start);
    const endString = this.getCostaRicaString(end);
    return startString + ' - ' + endString;
  }

  private getCostaRicaString(date: Date): string {
    return date.toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' });
  }
}
