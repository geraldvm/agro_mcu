import { TestBed } from '@angular/core/testing';

import { SlapService } from './slap.service';

describe('SlapService', () => {
  let service: SlapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
