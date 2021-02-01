import { TestBed } from '@angular/core/testing';

import { TamanhoEmpresaService } from './tamanho-empresa.service';

describe('TamanhoEmpresaService', () => {
  let service: TamanhoEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TamanhoEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
