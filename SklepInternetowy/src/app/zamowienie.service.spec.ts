import { TestBed, inject } from '@angular/core/testing';

import { ZamowienieService } from './zamowienie.service';

describe('ZamowienieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZamowienieService]
    });
  });

  it('should be created', inject([ZamowienieService], (service: ZamowienieService) => {
    expect(service).toBeTruthy();
  }));
});
