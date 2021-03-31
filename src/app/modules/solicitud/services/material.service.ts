import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicioGeneral } from 'src/app/classes/servicio-general';
import { IMatExtranjerosNal } from '../interfaces/materiales.extranjeros.nacional.interface';

@Injectable()
export class MaterialService extends ServicioGeneral<IMatExtranjerosNal> {

  protected path: string = 'material';

  public constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.url = this.buildUrl();
  }

}