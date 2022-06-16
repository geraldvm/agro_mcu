import { TestBed } from '@angular/core/testing';

import { FormToJsonService } from './form-to-json.service';

describe('FormToJsonService', () => {
  let service: FormToJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormToJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
