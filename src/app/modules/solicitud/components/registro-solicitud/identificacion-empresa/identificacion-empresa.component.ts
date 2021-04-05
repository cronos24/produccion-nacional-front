import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IPagina } from '../../../../../interfaces/pagina.interface';
import { IRespuesta } from '../../../../../interfaces/respuesta.interface';
import { Observable } from 'rxjs';
import { ISolicitud } from '../../../interfaces/solicitud.interface';
import { ModalComponent } from '../../../util/modal/modal.component';
import { IdentificacionEmpresaService } from '../../../services/registro-solicitud/identificacion-empresa/identificacion-empresa.service';

@Component({
  selector: 'app-identificacion-empresa',
  templateUrl: './identificacion-empresa.component.html',
  styleUrls: ['./identificacion-empresa.component.scss']
})
export class IdentificacionEmpresaComponent implements OnInit {



  public plantaProduccion: ISolicitud[] = [];

  public busqueda: string;
  public pagina: IPagina = {
    pagina: 1,
    registrosPorPagina: 8
  };
  public sort: { [key: string]: string };

  @Input()
  public set tipoFormulario(tipo: string) {
    this.updateFormulario(tipo);
  }

  @Output() identificacion = new EventEmitter<any>();

  identificacionEmpresa: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private identificacionEmpresaService: IdentificacionEmpresaService
    ) {
    this.identificacionEmpresa = this.fb.group({
      nit: ['', [Validators.required, Validators.maxLength(255)]],
      razonSocial: ['', [Validators.required, Validators.maxLength(255)]],
      nombreContacto: ['', [Validators.required, Validators.maxLength(255)]],
      correo: ['', [Validators.required, Validators.pattern(new RegExp(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?;)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/))]],
      indicativo: ['', [Validators.required, Validators.maxLength(4), Validators.pattern(new RegExp(/^\d{4,4}(-\d{4,4})*$/))]],
      telefono: ['', [Validators.required, Validators.minLength(7), Validators.pattern(new RegExp(/^\d{7,10}(-\d{7,10})*$/))]],
      departamentoPlanta: [null],
      direccionPlanta: [null],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.identificacion.emit(this.identificacionEmpresa);
  }
  ngOnInit(): void {}

  updateFormulario(tipoFormulario: string): void {
    switch (tipoFormulario) {
      case 'produccionNacional':
        this.identificacionEmpresa.reset();
        this.identificacionEmpresa.updateValueAndValidity();

        break;

      case 'fomentoIndustriaAutomotriz':
        this.identificacionEmpresa.reset();
        this.identificacionEmpresa.updateValueAndValidity();

        break;

      case 'regimenTransformacionEnsamblePlanillas':
        this.identificacionEmpresa.reset();
        this.identificacionEmpresa.updateValueAndValidity();

        break;

      default:
        this.resetActivar();
        this.identificacionEmpresa.reset();
        this.identificacionEmpresa.updateValueAndValidity();

        break;
    }
  }

  resetActivar(): void {
    this.identificacionEmpresa.reset();

  }

  public onBuscar(): void {
    this.getIdentificacionEmpresa();
  }

  public onSort(event: {
    sortField: string;
    sortOrder: number;
  }): void {
    this.sort = {
      ordenamientoCampo: event.sortField,
      ordenamientoDireccion: event.sortOrder === 1 ? 'ASC' : 'DESC'
    };
    this.getIdentificacionEmpresa();
  }

  public onPageChange(event: {
    page: number
  }): void {
    if (this.pagina.pagina !== event.page + 1) {
      this.pagina.pagina = event.page + 1;
      this.getIdentificacionEmpresa();
    }
  }

  eliminarPlanta(id: any, index){
    //this.identificacionEmpresaService.delete(id).subscribe((response: any) => {
      //if (response.codigo == 200) {
        //this.plantaProduccion.removeAt(index);
      //}
    //});
  }

  agregarPlanta(){

    if(this.identificacionEmpresa.controls.departamentoPlanta.value == null
      || this.identificacionEmpresa.controls.direccionPlanta.value == null
      || this.identificacionEmpresa.controls.direccion.invalid){

        this.openDialog(
          'info-warn',
          'Atención',
          'Verifique que seleccionó departamento, ciudad e ingresó la dirección de la Planta de Producción',
          'REGRESAR',
          undefined,
          undefined).subscribe((resp) => {

          });
    }else{
      let body: any = {
        nit: this.identificacionEmpresa.controls.nit.value,
        razonSocial: this.identificacionEmpresa.controls.razonSocial.value,
        nombreContacto: this.identificacionEmpresa.controls.nombreContacto.value,
        correo: this.identificacionEmpresa.controls.correo.value,
        indicativo: this.identificacionEmpresa.controls.indicativo.value,
        telefono: this.identificacionEmpresa.controls.telefono.value,
        departamentoPlanta: this.identificacionEmpresa.controls.departamentoPlanta.value,
        direccionPlanta: this.identificacionEmpresa.controls.direccionPlanta.value,
        direccion: this.identificacionEmpresa.controls.direccion.value
      };
      this.identificacionEmpresaService.post(body).subscribe((respuesta) => {
        this.getIdentificacionEmpresa();
      });
    }
  }

  public openDialog(
    icon: string,
    title_modal: string,
    text_content: string,
    title_first_button: string,
    title_second_button: string,
    text_content_specific: string

  ): Observable<any> {
    return new Observable((observer) => {

      const dialogRef = this.dialog.open(ModalComponent, {
        width: '500px',
        data: {
          title_first_button,
          title_second_button,
          text_content,
          text_content_specific,
          title_modal,
          icon
        }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('The dialog was closed' + result);
          observer.next(true);
        } else {
          observer.next(false);
        }

      });
    });
  }

  private getIdentificacionEmpresa(): void {
    this.identificacionEmpresaService.get({ queryParams: { datoBuscado: this.busqueda }, pagina: this.pagina, sort: this.sort }).subscribe((respuesta: IRespuesta<ISolicitud[]>): void => {
      this.plantaProduccion.pop();
      this.plantaProduccion = respuesta.respuesta.solicitudes as ISolicitud[];
       //this.pagina = respuesta.respuesta.pagina;
    });
  }

}
