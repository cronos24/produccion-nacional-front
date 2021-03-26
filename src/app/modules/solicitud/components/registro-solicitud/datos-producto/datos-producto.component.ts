import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-producto',
  templateUrl: './datos-producto.component.html',
  styleUrls: ['./datos-producto.component.scss'],
})
export class DatosProductoComponent implements OnInit {
  activarCodigo: boolean = true;
  activarTecnologia: boolean = true;
  activarMotoparte: boolean = true;

  public subpartidas: any[] = [];

  public messagesSubpartidaArancelaria: Message[] = [
    { severity: 'info', summary: '000 Descripcion de la subpartida' },
  ];

  public messagesCodigoNumericoUnico: Message[] = [
    {
      severity: 'info',
      summary: '000 Descripcion de la Codigo Numerico Unico (CNU)',
    },
  ];

  @Input()
  public set tipoFormulario(tipo: string) {
    this.updateFormulario(tipo);
  }

  @Output() producto = new EventEmitter<any>();

  datosProductos: FormGroup;

  constructor(private fb: FormBuilder) {
    this.datosProductos = this.fb.group({
      subpartida: [null],
      codigo: [null],
      comercial: [''],
      tecnico: [''],
      unidadComercial: [null],
      tecnologia: [''],
      motoparte: [''],
      sector: [null],
      tamano: [null],
      unidadesProducidas: [''],
    });

    this.producto.emit(this.datosProductos);
  }
  ngOnInit(): void {}

  updateFormulario(tipoFormulario: string): void {
    switch (tipoFormulario) {
      case 'produccionNacional':
        this.datosProductos.reset();
        this.turnOnActivar(tipoFormulario);
        this.datosProductos.updateValueAndValidity();

        break;

      case 'fomentoIndustriaAutomotriz':
        this.datosProductos.reset();
        this.turnOnActivar(tipoFormulario);
        this.datosProductos.updateValueAndValidity();

        break;

      case 'regimenTransformacionEnsamblePlanillas':
        this.datosProductos.reset();
        this.turnOnActivar(tipoFormulario);
        this.datosProductos.updateValueAndValidity();

        break;

      default:
        this.resetActivar();
        this.datosProductos.reset();
        this.datosProductos.updateValueAndValidity();

        break;
    }
  }

  resetActivar(): void {
    this.activarCodigo = true;
    this.activarTecnologia = true;
    this.activarMotoparte = true;
    this.datosProductos.reset();
  }

  turnOnActivar(formulario: string): void {
    this.activarCodigo =
      formulario === 'produccionNacional' ||
      formulario === 'regimenTransformacionEnsamblePlanillas'
        ? false
        : true;
    this.activarTecnologia =
      formulario === 'fomentoIndustriaAutomotriz' ||
      formulario === 'regimenTransformacionEnsamblePlanillas'
        ? true
        : false;
    this.activarMotoparte =
      formulario === 'produccionNacional' ||
      formulario === 'fomentoIndustriaAutomotriz'
        ? false
        : true;
  }
}