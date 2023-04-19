import { TestBed } from '@angular/core/testing';

import { AggrementGuard } from './aggrement.guard';

describe('AggrementGuard', () => {
  let guard: AggrementGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AggrementGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
