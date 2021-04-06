import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicioGeneral } from 'src/app/classes/servicio-general';

@Injectable()
export class MaterialService extends ServicioGeneral<any> {

  protected path: string = 'materiales';

  public constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.url = this.buildUrl();
  }

  public get formato(){
    return '/assets/csv/ejemploNacionales.csv';
  }

}