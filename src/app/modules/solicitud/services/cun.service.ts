import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ServicioGeneral } from '../../../classes/servicio-general';

@Injectable({
  providedIn: 'root'
})
export class CunService extends ServicioGeneral<any>{

  path: string = 'cun';

  public constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.buildUrl();
  }

}
