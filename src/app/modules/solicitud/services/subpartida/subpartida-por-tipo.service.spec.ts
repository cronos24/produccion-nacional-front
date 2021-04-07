import { TestBed } from '@angular/core/testing';

import { SubpartidaPorTipoService } from './subpartida-por-tipo.service';

describe('SubpartidaPorTipoService', () => {
  let service: SubpartidaPorTipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubpartidaPorTipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
