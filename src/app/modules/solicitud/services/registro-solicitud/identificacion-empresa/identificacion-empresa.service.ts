import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServicioGeneral } from '../../../../../classes/servicio-general';
import { IRespuesta } from '../../../../../interfaces/respuesta.interface';
import { ISolicitud } from '../../../interfaces/solicitud.interface';

@Injectable()
export class IdentificacionEmpresaService extends ServicioGeneral<ISolicitud> {

  protected path: string = 'anexos';

  public constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.url = this.buildUrl();
  }

  public descargarPDF(): Observable<IRespuesta<any>> {
    return this.httpClient.post<IRespuesta<any>>('', {});
  }

  public cancelarSolicitud(): Observable<IRespuesta<any>> {
    return this.httpClient.post<IRespuesta<any>>('', {});
  }


}