import { TestBed } from '@angular/core/testing';

import { SectorEconomicoService } from './sector-economico.service';

describe('SectorEconomicoService', () => {
  let service: SectorEconomicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectorEconomicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
