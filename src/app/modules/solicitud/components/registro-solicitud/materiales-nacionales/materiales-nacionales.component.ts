import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { IPagina } from 'src/app/interfaces/pagina.interface';
import { MaterialService } from '../../../services/material.service';
import { FormGeneric } from '../clases/form-generic';
import { MaterialNacionalComponent } from '../material-nacional/material-nacional.component';

@Component({
  selector: 'app-materiales-nacionales',
  templateUrl: './materiales-nacionales.component.html',
  styleUrls: ['./materiales-nacionales.component.scss'],
})
export class MaterialesNacionalesComponent extends FormGeneric {

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'materialesNacionales';

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

  public agregarInsumo(data?: any): void {
    const dialogRef = this.dialog.open(MaterialNacionalComponent, {
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
      this.getMateriales();
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
    document.getElementById('input-file-excel').click();
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
      this.getMateriales();
    });

    this.archivo = null;
  }

  public downloadFile(): void {
    const replacer = (key, value) => value === null ? '' : value;
    const header = ['nombreTecnico', 'subpartidaId', 'unidadId', 'cantidad', 'valorPlanta'];
    const headerName = ['Nombre Tecnico', 'Subpartida', 'Unidad', 'Cantidad', 'Valor Planta'];
    let csv = this.materiales.map(row => {
      return header.map(fieldName => {
        return JSON.stringify(row[fieldName], replacer);
      }).join(',');
    });
    csv.unshift(headerName.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' });
    saveAs(blob, "MaterialesNacionales.csv");
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
      const respuesta = response.respuesta.datos as any[];
      this.materiales = [];
      let sumaValorPlanta = 0;
      respuesta.map(material => {
        if (material.tipoId == 'nacional') {
          this.materiales.push(material);
          sumaValorPlanta += material.valorPlanta;
        }
      })
      this.setChildFormGroupValue('listaInsumos', this.materiales);
      this.setChildFormGroupValue('valorTotalUnidadProducto', sumaValorPlanta.toFixed(2));
    });
  }

}
