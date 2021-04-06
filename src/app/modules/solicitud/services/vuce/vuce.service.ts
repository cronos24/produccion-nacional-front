import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRespuesta } from 'src/app/interfaces/respuesta.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VuceService {

  public headers: any = {};
  public url: string;
  public lenguaje: string = 'es';
  constructor(
    private httpClient: HttpClient
  ) {
    this.url = this.construirUrl();
    this.obtenerToken();
  }

  public get<T>(rutaAdicional: string, options?: {
    queryParams?: { [key: string]: string }
  }
  ): Observable<IRespuesta<T[]>> {
    let httpParams: HttpParams = new HttpParams();

    if (options?.queryParams) {
      httpParams = this.addQueryParams(httpParams, options.queryParams);
    }
    return this.httpClient.get<IRespuesta<T[]>>(this.url + rutaAdicional, { params: httpParams, headers: this.headers });
  }

  public getGeneric(rutaAdicional?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + rutaAdicional);
  }

  public put(body: any, rutaAdicional?: string): Observable<any> {
    return this.httpClient.put<any>(this.url + rutaAdicional, body);
  }

  public post(body: any, rutaAdicional?: string): Observable<any> {
    return this.httpClient.post<any>(this.url + rutaAdicional, body);
  }


  private construirUrl(): string {
    const configuracion: any = environment.VUCE_API['MDM'];
    return `${configuracion.protocol}://${configuracion.host}:${configuracion.port}/${configuracion.pathName}`;
  }

  private obtenerToken(): void {
    // let body: any = {
    //   cliente: "mdm",
    //   apiKey: "376ea8e2f0861bc62728d7621cecc5bf4e9252a01a63d899dec524deac9e6a2a"
    // }

    let body: any = {
      cliente: "seiex-ci",
      apiKey: "083834c54fa367c58ecec74a4bcdd154459ea4d66f948fef3b5196be7e17252d"
    }
    
    
    this.httpClient.post(`${this.url}/seguridad/${this.lenguaje}/generar-token`, body).subscribe(
      (serviceResponse: IRespuesta<any>) => {
        if (serviceResponse.codigo === 200) {
          localStorage.setItem('token',  serviceResponse.respuesta.token);
          // setTimeout(() => {
          //   localStorage.clear();
          //   this.obtenerToken();
          // }, (serviceResponse.respuesta.expiration - serviceResponse.respuesta.issuedAt) - 5000);
        }
      }
    )
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
