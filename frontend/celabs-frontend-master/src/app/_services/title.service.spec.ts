import { TestBed } from '@angular/core/testing';

import { TitleService } from './title.service';

describe('TitleService', () => {
  let service = new TitleService();

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should set a title', () => {
    service.setTitle('Título');
    service.getTitle().subscribe((result) => {
      expect(result).toBe('Título');
    });
  });
});
