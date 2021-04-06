import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicioGeneral } from 'src/app/classes/servicio-general';

@Injectable()
export class SubpartidaPorTipoService extends ServicioGeneral<any>{
  protected path: string = 'solicitudes';
  constructor(
    public httpClient: HttpClient
  ) { 
    super(httpClient);
    this.url = this.buildUrl();
    debugger;
  }
}
