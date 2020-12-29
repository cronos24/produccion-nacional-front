import { Component, OnInit } from '@angular/core';

import { IPagina } from '../../../../interfaces/pagina.interface';
import { IRespuesta } from '../../../../interfaces/respuesta.interface';
import { ISolicitud } from '../../interfaces/solicitud.interface';
import { SolicitudService } from '../../services/solicitud.service';

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
    registrosPorPagina: 2
  };
  public sort: { [key: string]: string } = {
  };

  public constructor(private solicitudService: SolicitudService) { }

  public ngOnInit(): void {
    this.getSolicitudes();
  }

  public onBuscar(): void {
    this.getSolicitudes();
  }

  public onSort(event: {
    data: any[];
    mode: string;
    field: string;
    order: number;
  }): void {
    this.sort = {
      ordenamientoCampo: event.field,
      ordenamientoDireccion: event.order === 1 ? 'ASC' : 'DESC'
    };
    console.log(event);
    this.getSolicitudes();
  }

  public onPageChange(event: {
    first: number,
    rows: number,
    page: number,
    pageCount: number;
  }): void {
    if (this.pagina.pagina !== event.page + 1) {
      this.pagina.pagina = event.page + 1;
      this.getSolicitudes();
    }
  }

  public getSolicitudes(): void {
    this.solicitudes = [];
    this.solicitudService.get({ queryParams: { datoBuscado: this.busqueda }, pagina: this.pagina, sort: this.sort }).subscribe((respuesta: IRespuesta<ISolicitud[]>): void => {
      this.solicitudes = respuesta.respuesta.solicitudes;
      // this.pagina = respuesta.respuesta.pagina;
    });
  }

}
