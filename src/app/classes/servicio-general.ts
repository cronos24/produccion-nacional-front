import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IPagina } from '../interfaces/pagina.interface';
import { IRespuesta } from '../interfaces/respuesta.interface';

export abstract class ServicioGeneral<T> {

  protected path: string;

  protected url: string;

  public constructor(protected httpClient: HttpClient) {
  }

  public buildBaseUrl(): string {
    return environment.CONFIGURACION_SERVICIOS['produccion-nacional'].protocol +
      '://' +
      environment.CONFIGURACION_SERVICIOS['produccion-nacional'].host +
      ':' +
      environment.CONFIGURACION_SERVICIOS['produccion-nacional'].port
  }

  public buildUrl(): string {
    return environment.CONFIGURACION_SERVICIOS['produccion-nacional'].protocol +
      '://' +
      environment.CONFIGURACION_SERVICIOS['produccion-nacional'].host +
      ':' +
      environment.CONFIGURACION_SERVICIOS['produccion-nacional'].port +
      '/' +
      environment.CONFIGURACION_SERVICIOS['produccion-nacional'].pathName +
      '/' +
      this.path;
  }

  public get(options?: {
    postfix?: string,
    queryParams?: { [key: string]: string },
    pagina?: IPagina,
    sort?: { [key: string]: string }
  }): Observable<IRespuesta<T[]>> {
    let url = this.url;
    let httpParams: HttpParams = new HttpParams();

    if (options?.postfix) {
      url = this.url + options.postfix;
    }
    if (options?.queryParams) {
      httpParams = this.addQueryParams(httpParams, options.queryParams);
    }
    if (options?.pagina) {
      httpParams = this.addQueryParams(httpParams, options.pagina);
    }
    if (options?.sort) {
      httpParams = this.addQueryParams(httpParams, options.sort);
    }

    return this.httpClient.get<IRespuesta<T[]>>(url, { params: httpParams });
  }

  public getById(id: string, options?: {
    postfix?: string,
    queryParams?: { [key: string]: string }
  }): Observable<IRespuesta<T[]>> {
    let url = this.url;
    let httpParams: HttpParams = new HttpParams();

    if (options?.postfix) {
      url = this.url + options.postfix;
    }
    if (options?.queryParams) {
      httpParams = this.addQueryParams(httpParams, options.queryParams);
    }

    return this.httpClient.get<IRespuesta<T[]>>(`${url}/${id}`, { params: httpParams });
  }

  public put(body: any, options?: {
    postfix?: string
  }): Observable<any> {
    let url = `${this.url}/${body.id}`;

    if (options?.postfix) {
      url = this.url + options.postfix;
    }
    return this.httpClient.put<any>(url, body);
  }

  public getGeneric(): Observable<any> {
    return this.httpClient.get<any>(this.url);
  }

  public getGenericById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url + '/' + id);
  }

  public post(body: any, options?: {
    postfix?: string
  }): Observable<any> {
    let url = this.url;

    if (options?.postfix) {
      url = this.url + options.postfix;
    }
    return this.httpClient.post<any>(url, body);
  }

  public patch(body: any): Observable<any> {
    return this.httpClient.patch<any>(this.url, body);
  }
  public delete(id: any, options?: {
    postfix?: string
  }): Observable<any> {
    let url = this.url;

    if (options?.postfix) {
      url = this.url + options.postfix;
    }
    return this.httpClient.delete<any>(url + '/' + id);
  }

  private addQueryParams(httpParams: HttpParams, object: object): HttpParams {
    Object.keys(object).forEach((key: string): void => {
      if (object[key]) {
        httpParams = httpParams.append(key, object[key]);
      }
    });
    return httpParams;
  }

}
