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
    { field: 'color', header: 'Estado' },
    { field: 'color', header: 'Archivo PDF' },
    { field: 'color', header: 'Carta de respuesta' },
    { field: 'color', header: 'Eliminar borrador' },
    { field: 'color', header: 'Generar copia de borrador' },
    { field: 'color', header: 'Cancelar registro' },
    { field: 'anexos', header: 'Ver anexos' }
  ];

  public solicitudes: any[] = [
    {
      radicado: 123456
    }
  ];

}
