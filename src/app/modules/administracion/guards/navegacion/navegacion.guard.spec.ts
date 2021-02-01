import { TestBed } from '@angular/core/testing';

import { NavegacionGuard } from './navegacion.guard';

describe('NavegacionGuard', () => {
  let guard: NavegacionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NavegacionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
