import { TestBed, async, inject } from '@angular/core/testing';

import { LoggingGuardGuard } from './logging.guard';

describe('LoggingGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggingGuardGuard]
    });
  });

  it('should ...', inject([LoggingGuardGuard], (guard: LoggingGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
