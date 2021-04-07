import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AnexarArchivoComponent } from 'src/app/modules/anexos/components/anexar-archivo/anexar-archivo.component';
import { AnexoService } from 'src/app/modules/anexos/services/anexo/anexo.service';
import { IPagina } from '../../../../../interfaces/pagina.interface';
import { DivipolaService } from '../../../services/divipola/divipola.service';
import { MaquilaService } from '../../../services/registro-solicitud/maquila/maquila.service';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-proceso-produccion',
  templateUrl: './proceso-produccion.component.html',
  styleUrls: ['./proceso-produccion.component.scss']
})
export class ProcesoProduccionComponent extends FormGeneric implements OnInit {

  @ViewChild("confirmarEliminarMaquilasTemplate") confirmarEliminarMaquilasTemplate: TemplateRef<any>;
  @ViewChild("confirmarEliminarTodasMaquilasTemplate") confirmarEliminarTodasMaquilasTemplate: TemplateRef<any>;

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'procesoProduccion';

  public busqueda: string;
  public pagina: IPagina = {
    pagina: 0,
    registrosPorPagina: 10
  };
  public sort: { [key: string]: string };
  public departamentos: any[] = [];
  public ciudades: any[] = [];

  public maquilas: any[] = [];

  public continuar: boolean = false;

  public maquilaFormGroup = new FormGroup({
    nit: new FormControl('', [Validators.required]),
    razonSocial: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]),
    contacto: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(6000)]),
    correo: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    departamento: new FormControl(null, [Validators.required]),
    ciudad: new FormControl(null, [Validators.required]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]),
    telefono: new FormControl('', [Validators.required, Validators.min(7), Validators.maxLength(11)]),
    contrato: new FormControl('', [Validators.required]),
  })

  public constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private maquilaService: MaquilaService,
    private anexoService: AnexoService,
    private divipolaService: DivipolaService
  ) {
    super();
    this.departamentos = this.divipolaService.consultarDepartamentos();
    this.ciudades = this.divipolaService.consultarCiudades();
  }

  ngOnInit(): void {
    this.getChildFormGroupControl('contratoMaquila').valueChanges.subscribe((contratoMaquila) => {
      if (!contratoMaquila) {
        this.dialogRef = this.dialog.open(this.confirmarEliminarMaquilasTemplate);

        this.dialogRef.afterClosed().subscribe(() => {
          if (this.continuar) {
            this.setChildFormGroupValue('contratoMaquila', 'true');
            this.continuar = false;
          }
        });
      }
    });
  }

  public onBuscar(): void {
    this.getMaquilas();
  }

  public onSort(event: {
    sortField: string;
    sortOrder: number;
  }): void {
    this.sort = {
      ordenamientoCampo: event.sortField,
      ordenamientoDireccion: event.sortOrder === 1 ? 'ASC' : 'DESC'
    };
    this.getMaquilas();
  }

  public onPageChange(event: {
    page: number
  }): void {
    if (this.pagina.pagina !== event.page + 1) {
      this.pagina.pagina = event.page + 1;
      this.getMaquilas();
    }
  }

  public onAgregar(): void {
    let body = {
      nit: this.maquilaFormGroup.controls.nit.value,
      razonSocial: this.maquilaFormGroup.controls.razonSocial.value,
      contacto: this.maquilaFormGroup.controls.contacto.value,
      correo: this.maquilaFormGroup.controls.correo.value,
      departamento: this.maquilaFormGroup.controls.departamento.value,
      ciudad: this.maquilaFormGroup.controls.ciudad.value,
      direccion: this.maquilaFormGroup.controls.direccion.value,
      telefono: this.maquilaFormGroup.controls.telefono.value,
      solicitud: this.getFatherFormGroupValue('id'),
      usuarioCreacion: 'test'
    }

    this.maquilaService.post(body).subscribe((response) => {
      let adjunto = this.maquilaFormGroup.controls.contrato.value;
      console.log(response);
      let formData = new FormData();
      formData.append('solicitudId', this.getFatherFormGroupValue('id'));
      formData.append('nombre', adjunto.archivo.name);
      formData.append('descripcion', adjunto.descripcion);
      formData.append('file', adjunto.archivo);
      this.anexoService.post(formData).subscribe((responseAdjunto) => {
        console.log(responseAdjunto);
        this.maquilaFormGroup.reset();
        this.getMaquilas();
      });
    });
  }

  public onEliminar(id: string): void {
    this.maquilaService.delete(id).subscribe(() => {
      this.getMaquilas();
    });
  }

  public onEliminarTodasMaquilas(): void {
    this.dialogRef = this.dialog.open(this.confirmarEliminarTodasMaquilasTemplate);
  }

  public eliminarTodasMaquilas(): void {
    this.maquilas.forEach((maquila) => {
      this.maquilaService.delete(maquila.id).subscribe(() => {
        this.getMaquilas();
      });
    });
  }

  public getMaquilas(): void {
    this.maquilaService.get({
      queryParams: {
        datoBuscado: this.busqueda
      },
      pagina: this.pagina,
      sort: this.sort,
    }).subscribe((response) => {
      this.maquilas = response.respuesta.datos as any[];
      this.pagina = response.respuesta.paginacion as IPagina;
    });
  }

  public onAdjuntarArchivo(): void {
    this.dialogRef = this.dialog.open(AnexarArchivoComponent, { data: { incluirDescripcion: true }, width: '350px' });
    this.dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.maquilaFormGroup.controls.contrato.setValue(data);
      }
    });
  }
}
