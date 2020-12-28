import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-solicutud',
  templateUrl: './listar-solicutud.component.html',
  styleUrls: ['./listar-solicutud.component.scss']
})
export class ListarSolicutudComponent {
  public columns = [
    { field: 'radicado', header: 'Radicado' },
    { field: 'year', header: 'Fecha radicacion' },
    { field: 'brand', header: 'Nombre comercial' },
    { field: 'color', header: 'Responsable' },
    { field: 'color', header: 'Programa' },
    { field: 'color', header: 'Fecha de actuacion' },
    { field: 'color', header: 'Estado' }
  ];

  public solicitudes: any[] = [
    {
      radicado: 123456
    }
  ];

}
