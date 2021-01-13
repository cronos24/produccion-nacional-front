import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IPagina } from '../../../../interfaces/pagina.interface';
import { IRespuesta } from '../../../../interfaces/respuesta.interface';
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
    registrosPorPagina: 8
  };
  public sort: { [key: string]: string };

  public constructor(
    private dialog: MatDialog,
    private solicitudService: SolicitudService) { }

  public ngOnInit(): void {
    this.openDialog();
    this.getSolicitudes();
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

  public onCancelarSolicitud(solicitud: ISolicitud): void {
    this.dialog.open(CancelarSolicitudComponent, {
      data: {
        solicitud
      }
    });
  }

  private getSolicitudes(): void {
    this.solicitudService.get({ queryParams: { datoBuscado: this.busqueda }, pagina: this.pagina, sort: this.sort }).subscribe((respuesta: IRespuesta<ISolicitud[]>): void => {
      this.solicitudes.pop();
      this.solicitudes = respuesta.respuesta.solicitudes;
      // this.pagina = respuesta.respuesta.pagina;
    });
  }

  private openDialog(): void {
    this.dialog.open(SolicitudRequerimientoComponent);
  }

}
