import { TestBed } from '@angular/core/testing';

import { DateDisplayService } from './date-display.service';

describe('DateDisplayService', () => {
  let service = new DateDisplayService();

  beforeEach(() => { });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make single date display', () => {
    const start = new Date('2020-08-12T14:03:00+00:00');
    const end = new Date('2020-08-12T18:17:00+00:00');
    const display = '12/8/2020 08:03:00 - 12:17:00';
    expect(service.getSingleDayDisplay(start, end)).toBe(display);
  });

  it('should make multiple date display', () => {
    const start = new Date('2020-08-12T14:03:00+00:00');
    const end = new Date('2020-08-12T18:17:00+00:00');
    const display = '12/8/2020 08:03:00 - 12/8/2020 12:17:00';
    expect(service.getMultipleDayDisplay(start, end)).toBe(display);
  });

});
