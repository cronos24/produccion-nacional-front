import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicioGeneral } from '../../../../../classes/servicio-general';

@Injectable()
export class IdentificacionEmpresaService extends ServicioGeneral<any> {

  protected path: string = 'plantas';

  public constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.url = this.buildUrl();
  }

}
