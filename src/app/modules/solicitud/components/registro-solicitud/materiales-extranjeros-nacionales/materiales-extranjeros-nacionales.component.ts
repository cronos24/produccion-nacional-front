import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IPagina } from 'src/app/interfaces/pagina.interface';
import { IMatExtranjerosNal } from '../../../interfaces/materiales.extranjeros.nacional.interface';
import { MaterialService } from '../../../services/material.service';
import { FormGeneric } from '../clases/form-generic';
import { MaterialesExtranjerosComponent } from '../materiales-extranjeros/materiales-extranjeros.component';
import { saveAs } from 'file-saver';

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
  public sumaCif: string;
  public sumaValorPlanta: any = 0;

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
        this.guardarMaterial(result);
      }
    });
  }

  public guardarMaterial(data: any): void {
    if (data.id) {
      this.materialService.put(data).subscribe(() => {
        this.getMateriales();
      });
    } else {
      data.solicitudId = this.getFatherFormGroupValue('id');
      this.materialService.post(data).subscribe(() => {
        this.getMateriales();
      });
    }
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

  public seleccionarArchivo(): void {
    document.getElementById('input-file').click();
  }

  public subirArchivo(event: any): void {
    if (event.target.files[0].type == 'application/vnd.ms-excel') {
      this.archivo = event.target.files[0];
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

  public downloadFile(): void {
    const replacer = (key, value) => value === null ? '' : value;
    const header = ['nombreTecnico', 'subpartidaId', 'paisOrigenId', 'paisProcedenciaId', 'unidadId', 'cantidad', 'valorCif', 'valorPlanta'];
    const headerName = ['Nombre Tecnico', 'Subpartida', 'Pais Origen', 'Pais Procedencia', 'Unidad', 'Cantidad', 'Valor Cif', 'Valor Planta'];
    let csv = this.materiales.map(row => {
      return header.map(fieldName => {
        return JSON.stringify(row[fieldName], replacer);
      }).join(',');
    });
    csv.unshift(headerName.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' });
    saveAs(blob, "myFile.csv");
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
      let sumaCif = 0;
      let sumaValorPlanta = 0;
      this.materiales.map(material => {
        sumaCif += material.valorCif;
        sumaValorPlanta += material.valorPlanta;
      })
      this.sumaCif = sumaCif.toFixed(2);
      this.sumaValorPlanta = sumaValorPlanta.toFixed(2);
    });
  }

}
