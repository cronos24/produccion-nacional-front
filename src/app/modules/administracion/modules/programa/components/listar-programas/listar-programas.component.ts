import { Component, OnInit } from '@angular/core';
import { IPagina } from 'src/app/interfaces/pagina.interface';

@Component({
  selector: 'app-listar-programas',
  templateUrl: './listar-programas.component.html',
  styleUrls: ['./listar-programas.component.scss']
})
export class ListarProgramasComponent implements OnInit {

  public solicitudes: any[] = [];
  public busqueda: string;
  public pagina: IPagina = {
    pagina: 1,
    registrosPorPagina: 8
  };
  public sort: { [key: string]: string };
  constructor() { }

  ngOnInit(): void {
  }

  public onBuscar(): void {
    // this.getSolicitudes();
  }

  public onSort(event: {
    sortField: string;
    sortOrder: number;
  }): void {
    this.sort = {
      ordenamientoCampo: event.sortField,
      ordenamientoDireccion: event.sortOrder === 1 ? 'ASC' : 'DESC'
    };
    // this.getSolicitudes();
  }

  public onPageChange(event: {
    page: number
  }): void {
    if (this.pagina.pagina !== event.page + 1) {
      this.pagina.pagina = event.page + 1;
      // this.getSolicitudes();
    }
  }
}
