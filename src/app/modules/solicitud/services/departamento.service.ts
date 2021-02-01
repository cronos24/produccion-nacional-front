import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicioGeneral } from 'src/app/classes/servicio-general';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends ServicioGeneral<any>{

  path: string = 'departamentos';

  public constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.buildUrl();
  }

}
