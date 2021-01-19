import { TestBed } from '@angular/core/testing';

import { SubpartidaService } from './subpartida.service';

describe('SubpartidaService', () => {
  let service: SubpartidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubpartidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
