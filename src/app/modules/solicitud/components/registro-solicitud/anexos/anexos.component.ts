import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

import { IPagina } from '../../../../../interfaces/pagina.interface';
import { IRespuesta } from '../../../../../interfaces/respuesta.interface';
import { ISolicitud } from '../../../interfaces/solicitud.interface';
import { AnexosService } from '../../../services/registro-solicitud/anexos/anexos.service';

@Component({
  selector: 'app-anexos',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.scss']
})
export class AnexosComponent {

  @Output() anexosInfo = new EventEmitter<any>();

  public anexos: ISolicitud[] = [];

  public busqueda: string;
  public pagina: IPagina = {
    pagina: 1,
    registrosPorPagina: 8
  };
  public sort: { [key: string]: string };

  anexosGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.anexosGroup = this.fb.group({
      archivo: [],
      descripcion: ['', [Validators.maxLength(50)]],
    });
    this.anexosInfo.emit(this.anexosGroup);

  }
  ngOnInit(): void {}



  public onBuscar(): void {
    this.getAnexos();
  }

  public onSort(event: {
    sortField: string;
    sortOrder: number;
  }): void {
    this.sort = {
      ordenamientoCampo: event.sortField,
      ordenamientoDireccion: event.sortOrder === 1 ? 'ASC' : 'DESC'
    };
    this.getAnexos();
  }

  public onPageChange(event: {
    page: number
  }): void {
    if (this.pagina.pagina !== event.page + 1) {
      this.pagina.pagina = event.page + 1;
      this.getAnexos();
    }
  }

  private getAnexos(): void {
    //this.anexosService.get({ queryParams: { datoBuscado: this.busqueda }, pagina: this.pagina, sort: this.sort }).subscribe((respuesta: IRespuesta<ISolicitud[]>): void => {
      //this.anexos.pop();
      //this.anexos = respuesta.respuesta.solicitudes as ISolicitud[];
      // this.pagina = respuesta.respuesta.pagina;
    //});
  }

}
