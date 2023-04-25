import { TestBed } from '@angular/core/testing';

import { ActivityGuard } from './activity.guard';

describe('ActivityGuard', () => {
  let guard: ActivityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActivityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
