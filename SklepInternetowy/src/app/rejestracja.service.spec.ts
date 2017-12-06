import { TestBed, inject } from '@angular/core/testing';

import { RejestracjaService } from './rejestracja.service';

describe('RejestracjaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RejestracjaService]
    });
  });

  it('should be created', inject([RejestracjaService], (service: RejestracjaService) => {
    expect(service).toBeTruthy();
  }));
});
