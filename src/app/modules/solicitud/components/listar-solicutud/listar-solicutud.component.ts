import { Component, OnInit } from '@angular/core';
import { IPaginacion } from 'src/app/interfaces/paginacion.interface';
import { IRespuesta } from 'src/app/interfaces/respuesta.interface';

import { ISolicitud } from '../../interfaces/solicitud.interface';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-listar-solicutud',
  templateUrl: './listar-solicutud.component.html',
  styleUrls: ['./listar-solicutud.component.scss']
})
export class ListarSolicutudComponent implements OnInit {
  public columns: {
    key: string;
    value: string;
  }[] = [
      { key: 'radicado', value: 'Radicado' },
      { key: 'year', value: 'Fecha radicacion' },
      { key: 'brand', value: 'Nombre comercial' },
      { key: 'color', value: 'Responsable' },
      { key: 'color', value: 'Programa' },
      { key: 'color', value: 'Fecha de actuacion' },
      { key: 'color', value: 'Estado' }
    ];

  public solicitudes: ISolicitud[] = [];

  public paginacion: IPaginacion = {
    pagina: 1,
    registrosPorPagina: 10
  };

  public constructor(private solicitudService: SolicitudService) { }

  public ngOnInit(): void {
    this.solicitudService.get({ paginacion: this.paginacion }).subscribe((respuesta: IRespuesta<ISolicitud>): void => {
      this.solicitudes = respuesta.data;
    });
  }

}
