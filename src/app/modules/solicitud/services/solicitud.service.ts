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
          fechaVencimiento:'2021-07-30',
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


  private registros2 = [
    {
            id:101,
            radicado:"20210610000002",
            padreId:98,
            estado:1,
            programaId:0,
            productoNombreComercial:null,
            productoNombreTecnico:null,
            productoUnidadId:null,
            productoUnidadesProducidas:null,
            productoSectorId:null,
            productoSubpartidaId:null,
            productoCnuId:null,
            productoTecnologia:null,
            productoMotoparteNumero:null,
            productoMotoparteDescripcion:null,
            empresaNitNumero:null,
            empresaRazonSocial:null,
            empresaTamanoId:null,
            empresaCorreoElectronico:"correo@empresa.com",
            empresaTelefonoIndicativo:null,
            empresaTelefonoNumero:null,
            empresaNitDv:null,
            empresaContactoNombre:null,
            soliResponsable:null,
            auditoria:{
               fechaCreacion:1617679196707,
               fechaCreacionFormateada:null,
               usuarioCreacion:"estatico",
               fechaModificacion:1622478280707,
               fechaModificacionFormateada:null,
               usuarioModificacion:"testproductor",
               estadoAuditoria:"1"
            },
            empresaProductorCriterio:null,
            empresaInsumosOrigen:null,
            empresaRepresentanteNombre:null,
            empresaRepresentanteIdentificacion:null,
            empresaRepresentanteCargo:null,
            descripcionTransformacionSustancial:null,
            descripcionCaracteristicasTecnicas:null,
            descripcionAplicaciones:null,
            agregadoNacional:null,
            contratoMaquila:null,
            anulacionMotivo:"Este motivo de anulacion es valido",
            cancelacionMotivo:null,
            aprobacionMotivo:null,
            requerimiento:null,
            copias:null,
            totalNacionales:0.00,
            totalOtros:null,
            totalTransaccion:null,
            van:null,
            procesoProduccion:null,
            firmaRadicado:null,
            firmaFecha:null,
            bienFinal:null,
            resolucion:null,
            programa:null,
            observacion:null,
            fechaCreacion:"06/04/2021 03:19:56",
            usuarioCreacion:"estatico",
            fechaModificacion:"31/05/2021 16:24:40",
            usuarioModificacion:"testproductor",
            estadoAuditoria:"1"
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
    console.log();
    
  }

  public consultarRegistro(codigo: string): any {
    return this.registros.find((registro) => registro.codigo == codigo);
  }

  public consultarRegistro2(codigo: string): any {
    return this.registros2.find((registro) => registro.radicado == codigo);
  }
  


}
