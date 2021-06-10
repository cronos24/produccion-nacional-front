import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicioGeneral } from '../../../classes/servicio-general';
import { ISolicitud } from '../interfaces/solicitud.interface';

@Injectable()
export class SolicitudService extends ServicioGeneral<ISolicitud> {

  protected path: string = 'solicitudes';
  private registros = [
    {
      codigo: '20210610000001',
      mensaje: '',
      respuesta: {
        registro:{
          fechaVencimiento:'2021-07-11',
          cantidadRenovaciones:1
        },
        pagina: {
          pagina: 0,
          registrosPorPagina: 0,
          paginasTotales: 0,
          registrosTotales: 0
        }
      }
    },
    {
      codigo: '20210610000002',
      mensaje: '',
      respuesta: {
        registro:{
          fechaVencimiento:'2021-11-15',
          cantidadRenovaciones:1
        },
        pagina: {
          pagina: 0,
          registrosPorPagina: 0,
          paginasTotales: 0,
          registrosTotales: 0
        }
      }
    },
    {
      codigo: '20210610000003',
      mensaje: '',
      respuesta: {
        registro:{
          fechaVencimiento:'2021-09-15',
          cantidadRenovaciones:2
        },
        pagina: {
          pagina: 0,
          registrosPorPagina: 0,
          paginasTotales: 0,
          registrosTotales: 0
        }
      }
    },
    {
      codigo: '20210610000004',
      mensaje: '',
      respuesta: {
        registro:{
          fechaVencimiento:'2021-06-15',
          cantidadRenovaciones:1
        },
        pagina: {
          pagina: 0,
          registrosPorPagina: 0,
          paginasTotales: 0,
          registrosTotales: 0
        }
      }
    },
  ];

  public constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.url = this.buildUrl();
  }

  public consultarRegistro(codigo: string): any {
    return this.registros.find((registro) => registro.codigo == codigo);
  }


}
