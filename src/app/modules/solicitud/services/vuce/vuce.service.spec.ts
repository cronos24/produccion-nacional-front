import { TestBed } from '@angular/core/testing';

import { VuceService } from './vuce.service';

describe('VuceService', () => {
  let service: VuceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VuceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
