import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { IPagina } from '../../../../interfaces/pagina.interface';
import { IRespuesta } from '../../../../interfaces/respuesta.interface';
import { ISolicitud } from '../../interfaces/solicitud.interface';
import { SolicitudService } from '../../services/solicitud.service';
import { SolicitudRequerimientoComponent } from '../solicitud-requerimiento/solicitud-requerimiento.component';

@Component({
  selector: 'app-listar-solicutud',
  templateUrl: './listar-solicutud.component.html',
  styleUrls: ['./listar-solicutud.component.scss']
})
export class ListarSolicutudComponent implements OnInit {

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

  private getSolicitudes(): void {
    this.solicitudService.get({ queryParams: { datoBuscado: this.busqueda }, pagina: this.pagina, sort: this.sort }).subscribe((respuesta: IRespuesta<ISolicitud[]>): void => {
      this.solicitudes.pop();
      this.solicitudes = respuesta.respuesta.solicitudes;
      // this.pagina = respuesta.respuesta.pagina;
    });
  }

  private openDialog(): void {
    const dialogRef: MatDialogRef<SolicitudRequerimientoComponent, any> = this.dialog.open(SolicitudRequerimientoComponent, {
      data: {
        titulo: 'Atención',
        descripcion: 'Las siguientes solicitudes tienen requerimientos pendientes. Por favor anexe los documentos solicitados para que la respectiva solicitud pueda ser evaluada.'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
