import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicioGeneral } from 'src/app/classes/servicio-general';

@Injectable({
  providedIn: 'root'
})
export class TamanhoEmpresaService extends ServicioGeneral<any>{

  //path: string = 'tamanho-empresa';
  path: string = 'cun';

  public constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.buildUrl();
  }

}
