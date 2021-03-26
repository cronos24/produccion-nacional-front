import { Component, OnInit } from '@angular/core';
import { IPagina } from 'src/app/interfaces/pagina.interface';
import { TipoProceso } from 'src/app/modelo/TipoProceso';
import { DefinicionTabla } from 'src/app/modules/shared/components/tabla/tabla.modelo';
import { IDeficionTabla } from '../../../interfaces/definicion.tabla.interface';
import { ISolicitud } from '../../../interfaces/solicitud.interface';

@Component({
  selector: 'app-materiales-extranjeros-nacionales',
  templateUrl: './materiales-extranjeros-nacionales.component.html',
  styleUrls: ['./materiales-extranjeros-nacionales.component.scss'],
})
export class MaterialesExtranjerosNacionalesComponent implements OnInit {
  public solicitudes: ISolicitud[] = [];
  cargando: boolean;

  public busqueda: string;
  public pagina: IPagina = {
    pagina: 1,
    registrosPorPagina: 8,
  };
  public definicionTabla: DefinicionTabla;
  constructor() {}

  ngOnInit(): void {
    this.cargando = true;
    this.crearDefinicionTabla();
  }

  crearDefinicionTabla() {
    this.cargando = false;
    this.definicionTabla = {
      titulo: 'Borradores y/o solicitudes existentes',
      propiedadesTabla: {
        dataKey: 'id',
        globalFilterFields: [
          'id',
          'programaId',
          'solicitudEstadoNombre',
          'modalidad.modalidadNombre',
          'programa.nombreCorto',
          'fechaCreacion',
          'importador.razonSocial',
        ],
        rows: 10,
      },
      columnas: [
        {
          titulo: 'Nombre Técnico',
          pSortableColumn: 'id',
          sortField: 'id',
          valor: 'id',
        },
        {
          titulo: 'Subpartida',
          pSortableColumn: 'fechaCreacion',
          sortField: 'fechaCreacion',
          valor: 'fechaCreacion',
        },
        {
          titulo: 'País Procedencia',
          pSortableColumn: '',
          sortField: '',
          valor: '',
        },
        {
          titulo: 'Unidad de Medida',
          pSortableColumn: '',
          sortField: '',
          valor: '',
        },
        {
          titulo: 'Cantidad',
          pSortableColumn: '',
          sortField: '',
          valor: '',
        },
        {
          titulo: 'Valor CIF (COP)',
          pSortableColumn: 'solicitudEstadoNombre',
          sortField: 'solicitudEstadoNombre',
          valor: 'solicitudEstadoNombre',
        },
        {
          titulo: 'Valor Planta (COP)',
          pSortableColumn: 'razonSocial',
          sortField: 'razonSocial',
          valor: (fila: any) => "Hola",
        }
      ],
      mostrarFormaEdicion: this.mostrarFormaEdicion,
      eliminar: this.eliminar,
      calcularLabelEditar: (fila: any) => {
        return 'ver';
      },
    };
  }

  public eliminar(dato: any, $event: [boolean]) {}
  mostrarFormaEdicion(parProceso: TipoProceso, dato: any) {}
}
