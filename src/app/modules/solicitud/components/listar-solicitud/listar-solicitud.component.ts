import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
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
    this.solicitudService.descargarPDF().subscribe();
  }

  public onEliminarBorrador(solicitud: ISolicitud, templateRef: any): void {
    if (solicitud.estado == this.estado['Borrador']) {
      this.dialogRef = this.dialog.open(templateRef, { data: { ...solicitud } });
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

  public onEliminar(): void {
  }

  public onCopiarBorrador(solicitud: ISolicitud, templateRef: any): void {
    this.dialogRef = this.dialog.open(templateRef, { data: { ...solicitud } });
  }

  public onCopiar(): void {
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
      console.log(respuesta, 'resp');

      this.solicitudes = respuesta.respuesta.solicitudes as ISolicitud[];
      this.pagina = respuesta.respuesta.pagina as IPagina;

      this.solicitudes.map((solicitud) => {
        solicitud.auditoria.fechaCreacionFormateada = moment(solicitud.auditoria.fechaCreacionFormateada, 'DD/MM/YYYY').toDate();

      });
      // this.pagina = respuesta.respuesta.pagina;
    });
  }

  private openDialog(): void {
    this.dialog.open(SolicitudRequerimientoComponent);
  }

}
