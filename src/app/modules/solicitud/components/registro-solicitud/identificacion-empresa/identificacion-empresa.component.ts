import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { IPagina } from '../../../../../interfaces/pagina.interface';
import { IRespuesta } from '../../../../../interfaces/respuesta.interface';
import { ISolicitud } from '../../../interfaces/solicitud.interface';

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

  constructor(private fb: FormBuilder) {
    this.identificacionEmpresa = this.fb.group({
      nit: ['', [Validators.required, Validators.maxLength(255)]],
      razonSocial: ['', [Validators.required, Validators.maxLength(255)]],
      nombreContacto: ['', [Validators.required, Validators.maxLength(255)]],
      correo: ['', [Validators.required, Validators.pattern(new RegExp(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?;)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/))]],
      indicativo: ['', [Validators.required, Validators.maxLength(4)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.pattern(new RegExp(/^\d{10,11}(-\d{10,11})*$/))]],
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

  private getIdentificacionEmpresa(): void {
    // this.pagina = respuesta.respuesta.pagina;
  }

}
