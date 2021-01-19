import { TestBed } from '@angular/core/testing';

import { UnidadComercialService } from './unidad-comercial.service';

describe('UnidadComercialService', () => {
  let service: UnidadComercialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadComercialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
