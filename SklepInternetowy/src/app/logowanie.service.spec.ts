import { TestBed, inject } from '@angular/core/testing';

import { LogowanieService } from './logowanie.service';

describe('LogowanieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogowanieService]
    });
  });

  it('should be created', inject([LogowanieService], (service: LogowanieService) => {
    expect(service).toBeTruthy();
  }));
});
