import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IPagina } from 'src/app/interfaces/pagina.interface';
import { IMatExtranjerosNal } from '../../../interfaces/materiales.extranjeros.nacional.interface';
import { MaterialService } from '../../../services/material.service';
import { FormGeneric } from '../clases/form-generic';
import { MaterialesExtranjerosComponent } from '../materiales-extranjeros/materiales-extranjeros.component';

@Component({
  selector: 'app-materiales-extranjeros-nacionales',
  templateUrl: './materiales-extranjeros-nacionales.component.html',
  styleUrls: ['./materiales-extranjeros-nacionales.component.scss'],
})
export class MaterialesExtranjerosNacionalesComponent extends FormGeneric {

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'materialesExtranjerosNacionales';

  public columnas: any[] = [
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
      titulo: 'País Origen',
      pSortableColumn: 'paisOrigen',
      sortField: 'paisOrigen',
      valor: 'paisOrigen',
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
  ];

  public busqueda: string;
  public pagina: IPagina = {
    pagina: 0,
    registrosPorPagina: 1000
  };
  public sort: { [key: string]: string };

  public archivo: any;
  public materiales: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private materialService: MaterialService,
  ) {
    super();
  }

  public onBuscar(): void {
    this.getMateriales();
  }

  public onSort(event: {
    sortField: string;
    sortOrder: number;
  }): void {
    this.sort = {
      ordenamientoCampo: event.sortField,
      ordenamientoDireccion: event.sortOrder === 1 ? 'ASC' : 'DESC'
    };
    this.getMateriales();
  }

  public downloadFormato(): void {

    window.open(this.materialService.formato, "_blank");

  }

  public agregarInsumo(data?: IMatExtranjerosNal): void {
    const dialogRef = this.dialog.open(MaterialesExtranjerosComponent, {
      data: data,
      width: '100%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
        } else {
          this.guardarMaterial(result);
        }
      }
    });
  }

  public guardarMaterial(data: IMatExtranjerosNal): void {
    this.materialService.post(data).subscribe(() => {

    });
  }


  public editarMaterial(data: IMatExtranjerosNal): void {
    this.materialService.patch(data).subscribe(() => {

    });
  }

  public eliminarMaterial(id, index): void {
    this.materialService.delete(id).subscribe(() => {
      this.materiales.splice(index, 1);
    });
  }

  public abrirEliminarConfirmacion(template: any): void {
    this.dialogRef = this.dialog.open(template);
  }

  public onEliminarTodos(): void {
    this.materiales.forEach((material) => {
      this.materialService.delete(material.id).subscribe();
    });
    this.materiales = [];
  }

  public exportarExcel(): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.materiales);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['Materiales'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'Materiales_Exportacion');
    });
  }

  public seleccionarArchivo(): void {
    document.getElementById('input-file').click();
  }

  public subirArchivo(event: any): void {
    if (event.target.files[0].type == 'application/vnd.ms-excel') {
      this.archivo = event.target.files[0];
    } else {

    }
  }

  public cargaMasiva(): void {
    let formData = new FormData();
    formData.append('nombre', this.archivo.name);
    formData.append('file', this.archivo);
    formData.append('solicitudId', this.getFatherFormGroupValue('id'));

    this.materialService.post(formData, {
      postfix: '/nacionales/masivo'
    }).subscribe((response) => {
      console.log(response);
      this.getMateriales();
    });

    this.archivo = null;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
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

  private getMateriales(): void {
    this.materialService.get({
      queryParams: {
        solicitudId: this.getFatherFormGroupValue('id'),
        datoBuscado: this.busqueda
      },
      pagina: this.pagina,
      sort: this.sort
    }).subscribe((response) => {
      this.materiales = response.respuesta.datos as any[];
    });
  }

}
