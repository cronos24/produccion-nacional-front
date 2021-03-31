import { Component, OnInit } from '@angular/core';
import { IPagina } from 'src/app/interfaces/pagina.interface';
import { TipoProceso } from 'src/app/modelo/TipoProceso';
import { DefinicionTabla } from 'src/app/modules/shared/components/tabla/tabla.modelo';
import { IMatExtranjerosNal } from '../../../interfaces/materiales.extranjeros.nacional.interface';
import { MaterialService } from '../../../services/material.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialesExtranjerosComponent } from '../materiales-extranjeros/materiales-extranjeros.component';

@Component({
  selector: 'app-materiales-extranjeros-nacionales',
  templateUrl: './materiales-extranjeros-nacionales.component.html',
  styleUrls: ['./materiales-extranjeros-nacionales.component.scss'],
})
export class MaterialesExtranjerosNacionalesComponent implements OnInit {
  public material: IMatExtranjerosNal[] = [];
  cargando: boolean;

  public materiales: IMatExtranjerosNal[] = [];
  public pagina: IPagina = {
    pagina: 1,
    registrosPorPagina: 8,
  };
  public sort: { [key: string]: string };

  public busqueda: string;
  public definicionTabla: DefinicionTabla;
  constructor(
    private materialService: MaterialService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>
  ) {}

  ngOnInit(): void {
    this.cargando = true;
    this.crearDefinicionTabla();
    this.obtenerMateriales();
  }

  crearDefinicionTabla() {
    this.cargando = false;
    this.definicionTabla = {
      titulo: 'Borradores y/o solicitudes existentes',
      propiedadesTabla: {
        dataKey: 'id',
        globalFilterFields: [
          'id',
          'nombreTecnico',
          'subpartida',
          'paisProcedencia',
          'undMedida',
          'cantidad',
          'valorCif',
          'valorPlanta',
        ],
        rows: 10,
      },
      columnas: [
        {
          titulo: 'Nombre Técnico',
          pSortableColumn: 'nombreTecnico',
          sortField: 'nombreTecnico',
          valor: 'nombreTecnico',
        },
        {
          titulo: 'Subpartida',
          pSortableColumn: 'subpartida',
          sortField: 'subpartida',
          valor: 'subpartida',
        },
        {
          titulo: 'País Procedencia',
          pSortableColumn: 'paisProcedencia',
          sortField: 'paisProcedencia',
          valor: 'paisProcedencia',
        },
        {
          titulo: 'Unidad de Medida',
          pSortableColumn: 'undMedida',
          sortField: 'undMedida',
          valor: 'undMedida',
        },
        {
          titulo: 'Cantidad',
          pSortableColumn: 'cantidad',
          sortField: 'cantidad',
          valor: 'cantidad',
        },
        {
          titulo: 'Valor CIF (COP)',
          pSortableColumn: 'valorCif',
          sortField: 'valorCif',
          valor: 'valorCif',
        },
        {
          titulo: 'Valor Planta (COP)',
          pSortableColumn: 'valorPlanta',
          sortField: 'valorPlanta',
          valor: 'valorPlanta',
        },
        {
          titulo: 'Editar',
          pSortableColumn: '',
          sortField: '',
          valor: '',
        },
        {
          titulo: 'Eliminar',
          pSortableColumn: '',
          sortField: '',
          valor: '',
        },
      ],
      mostrarFormaEdicion: () => {},
      eliminar: this.eliminar,
      calcularLabelEditar: (fila: any) => {
        return 'ver';
      },
    };
  }

  public onSort(event: { sortField: string; sortOrder: number }): void {
    this.sort = {
      ordenamientoCampo: event.sortField,
      ordenamientoDireccion: event.sortOrder === 1 ? 'ASC' : 'DESC',
    };
    //this.getProcesoProduccion();
  }

  public onPageChange(event: { page: number }): void {
    if (this.pagina.pagina !== event.page + 1) {
      this.pagina.pagina = event.page + 1;
      //this.getProcesoProduccion();
    }
  }

  public eliminar(dato: any, $event: [boolean]) {}
  mostrarFormaEdicion(data: IMatExtranjerosNal) {
    data.verbo = 'PUT';
    this.popUpAgregarInsumo(data);
  }

  public obtenerMateriales(): void {
    /**Eliminar mockup */
    let temMockUp: IMatExtranjerosNal[] = [
      {
        id: 123132131,
        nombreTecnico: 'No se nada',
        subpartida: '1231321231212121',
        paisOrigen: 'TU casa',
        paisProcedencia: 'Mi casa',
        undMedida: 'Litro',
        cantidad: '1500',
        valorCif: 256000,
        valorPlanta: 2522,
        verbo: 'POST',
      },
    ];
    this.materiales = temMockUp;
    /**Eliminar mockup */
    // this.materialService.get().subscribe((resp: any) => {
    //   console.info('la respuesta ', resp);
    //   if (resp.codigo == 200 || resp.codigo == 204) {
    //     this.materiales = resp.respuesta?.length > 0 ? resp.respuesta : [];
    //   }
    // });
  }

  public popUpAgregarInsumo(data: IMatExtranjerosNal = null): void {
    const dialogRef = this.dialog.open(MaterialesExtranjerosComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      switch (result.verbo) {
        case 'POST':
          this.guardarMaterial(result);
          break;
        case 'PUT':
          this.editarMaterial(result);
          break;
        default:
          break;
      }
    });
  }

  /**
   * guardarMateriales
   */
  public guardarMaterial(data: IMatExtranjerosNal): void {
    // this.materialService.post(data).subscribe((resp: any) => {
    //   console.info('la respuesta ', resp);
    //   if (resp.codigo == 200 || resp.codigo == 201) {
    //     data.id = resp.body.id; // ojo se debe asignar el id para posteriores manejos de data
    //     this.materiales.push(data);
    //   }
    // });
    /**Elimnar  */
    data.id = data.valorCif + data.valorPlanta;
    this.materiales.push(data);
    /**Elimnar  */
  }

  /**
   * editarMaterial
   */
  public editarMaterial(data: IMatExtranjerosNal): void {
    // this.materialService.put(data).subscribe((resp: any) => {
    //   console.info('la respuesta ', resp);
    //   if (resp.codigo == 200 || resp.codigo == 204) {
    // if (this.materiales.length > 1) {
    //   this.materiales = this.materiales.filter((x) => x.id != data.id);
    //   this.materiales.push(data);
    // } else {
    //   this.materiales = [data];
    // }
    //   }
    // });
    /**Elimnar  */
    if (this.materiales.length > 1) {
      this.materiales = this.materiales.filter((x) => x.id != data.id);
      this.materiales.push(data);
    } else {
      this.materiales = [data];
    }
    /**Elimnar  */
  }

  public eliminarMaterial(data: IMatExtranjerosNal): void {
    // this.materialService.delete(data).subscribe((resp: any) => {
    //   console.info('la respuesta ', resp);
    //   if (resp.codigo == 200 || resp.codigo == 201) {
    //     if (this.materiales.length > 1) {
    //       this.materiales = this.materiales.filter((x) => x.id != data.id);
    //     } else {
    //       this.materiales = [];
    //     }
    //   }
    // });

    /**Elimnar  */
    if (this.materiales.length > 1) {
      this.materiales = this.materiales.filter((x) => x.id != data.id);
    } else {
      this.materiales = [];
    }
    /**Elimnar  */
  }

  abrirEliminarConfimracion(template: any) {
    this.dialogRef = this.dialog.open(template, { width: '35%' });
  }

  onEliminarTodos() {
    this.materiales = [];
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.materiales);
      console.log("algo ewas", worksheet);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['Materiales'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'Materiales_Exportacion');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
}
