import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicioGeneral } from '../../../classes/servicio-general';
import { ISolicitud } from '../interfaces/solicitud.interface';


@Injectable()
export class SolicitudService extends ServicioGeneral<ISolicitud> {

  protected path: string = 'solicitudes';

  public constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.url = this.buildUrl();
  }

}
