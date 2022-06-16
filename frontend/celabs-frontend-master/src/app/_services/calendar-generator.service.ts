import { Injectable } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import interactionPlugin from '@fullcalendar/interaction';

@Injectable({
  providedIn: 'root'
})
export class CalendarGeneratorService {

  constructor() { }

  public generateCalendar() {
    const calendarOptions = {
      locale: esLocale,
      aspectRatio: 0.618,
      expandRows: true,
      initialView: 'timeGridWeek',
      nowIndicator: true,
      slotDuration: '01:00:00',
      selectOverlap: false,
      themeSystem: 'bootstrap',
      plugins: [bootstrapPlugin, interactionPlugin],
      progressiveEventRendering: true,
      displayEventEnd: true,
      eventTextColor: '#FFFFFF',
      eventBorderColor: '#FFFFFF',
      eventColor: '#0154A0',
      buttonText: {
        next: '>',
        prev: '<',
      },
      headerToolbar: {
        start: 'title',
        center: '',
        end: 'prev,today,next'
      },
      selectable: true,
      allDaySlot: false,
      selectMirror: true,
      displayEventTime: false,
      unselectCancel: 'app-lab-reservation-normal-select',
      selectConstraint: 'businessHours'
    };
    return calendarOptions;
  }
}
