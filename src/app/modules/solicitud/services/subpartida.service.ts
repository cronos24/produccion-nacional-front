import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicioGeneral } from 'src/app/classes/servicio-general';

@Injectable({
  providedIn: 'root'
})
export class SubpartidaService extends ServicioGeneral<any>{

  path: string = 'subpartida';

  public constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.buildUrl();
  }

}
