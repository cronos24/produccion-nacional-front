import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicioGeneral } from 'src/app/classes/servicio-general';

@Injectable()
export class FirmaService extends ServicioGeneral<any>{

  path: string = 'portafirma';

  public constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.url = this.buildUrl();
  }

  public postUrl(body: any, options?: {
    postfix?: string
  }): Observable<string> {
    let url = this.url;

    if (options?.postfix) {
      url = this.url + options.postfix;
    }
    return this.httpClient.post(url, body, {responseType: 'text'});
  }

}
