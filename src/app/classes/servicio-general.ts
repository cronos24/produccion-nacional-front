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
        queryParams?: { [key: string]: string },
        pagina?: IPagina,
        sort?: { [key: string]: string }
    }): Observable<IRespuesta<T[]>> {
        let httpParams: HttpParams = new HttpParams();

        if (options?.queryParams) {
            httpParams = this.addQueryParams(httpParams, options.queryParams);
        }
        if (options?.pagina) {
            httpParams = this.addQueryParams(httpParams, options.pagina);
        }
        if (options?.sort) {
            httpParams = this.addQueryParams(httpParams, options.sort);
        }

        return this.httpClient.get<IRespuesta<T[]>>(this.url, { params: httpParams });
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
