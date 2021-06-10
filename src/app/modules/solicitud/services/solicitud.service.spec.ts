import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IRespuesta } from 'src/app/interfaces/respuesta.interface';

import { ISolicitud } from '../interfaces/solicitud.interface';

import { SolicitudService } from './solicitud.service';

fdescribe('SolicitudService', (): void => {
  let service: SolicitudService;
  let httpMock: HttpTestingController;

  const URL: string = 'http://3aa8b8e5a00c.ngrok.io:80/api-vuce/v1/solicitudes';

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SolicitudService
      ]
    });
    service = TestBed.inject(SolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach((): void => {
    httpMock.verify();
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  it('buildUrl()', (): void => {
    expect(service.buildUrl()).toBe(URL);
  });

  it('get()', (): void => {
    const expectedRespuesta: IRespuesta<ISolicitud[]> = {
      codigo: 0,
      mensaje: '',
      respuesta: {
        solicitudes: [],
        pagina: {
          pagina: 0,
          registrosPorPagina: 0,
          paginasTotales: 0,
          registrosTotales: 0
        }
      }
    };

    service.get().subscribe(
      (response: IRespuesta<ISolicitud[]>): void => {
        expect(response).toEqual(expectedRespuesta);
      }
    );

    const request: TestRequest = httpMock.expectOne(URL);
    expect(request.request.method).toBe('GET');
    request.flush(expectedRespuesta);
  });

  it('get() with options.queryParams', (): void => {
    const expectedRespuesta: IRespuesta<ISolicitud[]> = {
      codigo: 0,
      mensaje: '',
      respuesta: {
        solicitudes: [],
        pagina: {
          pagina: 0,
          registrosPorPagina: 0,
          paginasTotales: 0,
          registrosTotales: 0
        }
      }
    };

    const options: any = {
      queryParams: {
        queryParamOne: 'valueOne'
      }
    };

    service.get(options).subscribe(
      (response: IRespuesta<ISolicitud[]>): void => {
        expect(response).toEqual(expectedRespuesta);
      }
    );

    const request: TestRequest = httpMock.expectOne(URL + '?queryParamOne=valueOne');
    expect(request.request.method).toBe('GET');
    request.flush(expectedRespuesta);
  });

  it('descargarPDF()', (): void => {
    const expectedRespuesta: IRespuesta<any> = {
      codigo: 0,
      mensaje: '',
      respuesta: {
      }
    };

    // service.descargarPDF().subscribe(
    //   (response: IRespuesta<any>): void => {
    //     expect(response).toEqual(expectedRespuesta);
    //   }
    // );

    const request: TestRequest = httpMock.expectOne('');
    expect(request.request.method).toBe('POST');
    request.flush(expectedRespuesta);
  });

  it('cancelarSolicitud()', (): void => {
    const expectedRespuesta: IRespuesta<any> = {
      codigo: 0,
      mensaje: '',
      respuesta: {
      }
    };

    // service.cancelarSolicitud().subscribe(
    //   (response: IRespuesta<any>): void => {
    //     expect(response).toEqual(expectedRespuesta);
    //   }
    // );

    const request: TestRequest = httpMock.expectOne('');
    expect(request.request.method).toBe('POST');
    request.flush(expectedRespuesta);
  });
});
