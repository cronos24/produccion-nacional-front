import { TestBed } from '@angular/core/testing';

import { MaquilaService } from './maquila.service';

describe('MaquilaService', () => {
  let service: MaquilaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaquilaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
