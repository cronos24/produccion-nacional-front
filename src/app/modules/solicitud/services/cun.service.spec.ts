import { TestBed } from '@angular/core/testing';

import { CunService } from './cun.service';

describe('CunService', () => {
  let service: CunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
