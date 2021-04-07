import { TestBed } from '@angular/core/testing';

import { DianService } from './dian.service';

describe('DianService', () => {
  let service: DianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
