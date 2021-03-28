import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { MessageService } from 'primeng/api';
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component';
import { IPagina } from '../../../../interfaces/pagina.interface';
import { IRespuesta } from '../../../../interfaces/respuesta.interface';
import { Estado } from '../../enums/estado.enum';
import { ISolicitud } from '../../interfaces/solicitud.interface';
import { SolicitudService } from '../../services/solicitud.service';
import { CancelarSolicitudComponent } from '../cancelar-solicitud/cancelar-solicitud.component';
import { SolicitudRequerimientoComponent } from '../solicitud-requerimiento/solicitud-requerimiento.component';


@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.scss']
})
export class ListarSolicitudComponent implements OnInit {

  public solicitudes: ISolicitud[] = [];

  public busqueda: string;
  public pagina: IPagina = {
    pagina: 1,
    registrosPorPagina: 10
  };
  public sort: { [key: string]: string };

  public get estado(): typeof Estado {
    return Estado;
  }

  public constructor(
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private messageService: MessageService,
    private solicitudService: SolicitudService) { }

  public ngOnInit(): void {
    this.openDialog();
  }

  public onBuscar(): void {
    this.getSolicitudes();
  }

  public onSort(event: {
    sortField: string;
    sortOrder: number;
  }): void {
    this.sort = {
      ordenamientoCampo: event.sortField,
      ordenamientoDireccion: event.sortOrder === 1 ? 'ASC' : 'DESC'
    };
    this.getSolicitudes();
  }

  public onPageChange(event: {
    page: number
  }): void {
    if (this.pagina.pagina !== event.page + 1) {
      this.pagina.pagina = event.page + 1;
      this.getSolicitudes();
    }
  }

  public onDescargarPDF(): void {
    //this.solicitudService.descargarPDF().subscribe();
  }

  public onEliminarBorrador(solicitud: ISolicitud, index: number, templateRef: any): void {
    if (solicitud.estado == this.estado['Borrador']) {
      this.dialogRef = this.dialog.open(templateRef, { data: { index, ...solicitud } });
    } else {
      this.dialog.open(AlertComponent, {
        data: {
          type: 'warning',
          title: 'Atención',
          description: 'No es posible eliminar este registro, la solicitud respectiva ya ha sido radicada',
          acceptButton: 'REGRESAR'
        }
      });
    }
  }

  public onEliminar(id: number, index: number): void {
    this.solicitudService.delete(id).subscribe(() => {
      this.solicitudes.splice(index, 1);
      this.messageService.add({ severity: 'success', summary: 'Borrador eliminado' });
    }, () => {
      this.dialog.open(AlertComponent, {
        data: {
          type: 'error',
          title: 'Atención',
          description: 'No fue posible borrar el registro, Por favor intente de nuevo mas tarde.',
          acceptButton: 'REGRESAR'
        }
      });
    });
    this.dialogRef.close();
  }

  public onCopiarBorrador(solicitud: ISolicitud, index: number, templateRef: any): void {
    this.dialogRef = this.dialog.open(templateRef, { data: { index, ...solicitud } });
  }

  public onCopiar(id: number, index: number): void {
    this.solicitudService.post(null, { postfix: `/${id}/copiar` }).subscribe((respuesta: any) => {
      const solicitud = respuesta.respuesta;
      solicitud.auditoria.fechaCreacionFormateada = moment(solicitud.auditoria.fechaCreacionFormateada, 'DD/MM/YYYY').toDate();

      this.solicitudes.splice(index + 1, 1, solicitud);
      this.messageService.add({ severity: 'success', summary: 'Solicitud copiada' });
    }, () => {
      this.dialog.open(AlertComponent, {
        data: {
          type: 'error',
          title: 'Atención',
          description: 'No fue posible copiar la solicitud, Por favor intente de nuevo mas tarde.',
          acceptButton: 'REGRESAR'
        }
      });
    });
    this.dialogRef.close();
  }

  public onCancelarRegistro(solicitud: ISolicitud): void {
    if (solicitud.estado == this.estado['Aprobado']) {
      this.dialog.open(CancelarSolicitudComponent, {
        data: {
          solicitud
        }
      });
    }
    else {
      this.dialog.open(AlertComponent, {
        data: {
          type: 'warning',
          title: 'Atención',
          description: 'No es posible solicitar cancelacion del registro ya que NO ha sido aprobada',
          acceptButton: 'REGRESAR'
        }
      });
    }
  }

  private getSolicitudes(): void {
    this.solicitudService.get({ queryParams: { datoBuscado: this.busqueda }, pagina: this.pagina, sort: this.sort }).subscribe((respuesta: IRespuesta<ISolicitud[]>): void => {
      this.solicitudes = respuesta.respuesta.solicitudes as ISolicitud[];
      this.pagina = respuesta.respuesta.pagina as IPagina;

      let nowDate = moment(new Date());

      this.solicitudes.map((solicitud) => {
        solicitud.auditoria.fechaCreacionFormateada = moment(solicitud.auditoria.fechaCreacionFormateada, 'DD/MM/YYYY').toDate();

        if (solicitud.estado == this.estado['Borrador']) {
          const diff = nowDate.diff(solicitud.auditoria.fechaCreacionFormateada, 'days');

          if (diff > 30) {
            this.solicitudService.delete(solicitud.id).subscribe(() => {
              this.dialog.open(AlertComponent, {
                data: {
                  type: 'warning',
                  title: 'Atención',
                  description: `El borrador ${solicitud.radicado} ha sido eliminado por llevar mas de 30 dias creado`,
                  acceptButton: 'REGRESAR'
                }
              });
            });
          }
        }
      });
    });
  }

  private openDialog(): void {
    this.dialog.open(SolicitudRequerimientoComponent, {
      width: '40%'
    });
  }

}
