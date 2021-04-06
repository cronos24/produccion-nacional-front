import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicioGeneral } from 'src/app/classes/servicio-general';

@Injectable()
export class AnexoService extends ServicioGeneral<any> {

  protected path: string = '/pn/api/v1/adjuntos';

  public constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.url = this.buildBaseUrl() + this.path;
  }

  public getFile(path) {
    return this.buildBaseUrl() + path
  }

}
