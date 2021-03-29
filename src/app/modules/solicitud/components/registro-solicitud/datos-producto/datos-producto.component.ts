import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-datos-producto',
  templateUrl: './datos-producto.component.html',
  styleUrls: ['./datos-producto.component.scss'],
})
export class DatosProductoComponent {

  @Input() public set tipoFormulario(tipo: string) {
    this._tipoFormulario = tipo;
    this.actualizarFormulario(tipo);
  }
  public get tipoFormulario(): string {
    return this._tipoFormulario;
  }

  @Output() producto = new EventEmitter<any>();

  public _tipoFormulario: string;

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

  public formGroup: FormGroup = new FormGroup({
    subpartida: new FormControl([null, [Validators.required]]),
    nombreComercial: new FormControl(['', [Validators.required]]),
    nombreTecnico: new FormControl(['', [Validators.required]]),
    unidadComercial: new FormControl([null, [Validators.required]]),
    sectorEconomico: new FormControl([null, [Validators.required]]),
    tamanoEmpresa: new FormControl([null, [Validators.required]]),
    unipadesProducidas: new FormControl(['', [Validators.required, Validators.min(0)]]),
  });

  constructor() {
  }

  private actualizarFormulario(tipoFormulario: string): void {
    switch (tipoFormulario) {
      case 'fomentoIndustriaAutomotriz' || 'fomentoIndustriaAstilleros':
        this.formGroup.addControl('codigoNumericoUnico', new FormControl('', [Validators.required]));
        this.formGroup.addControl('tecnologia', new FormControl('', [Validators.required]));
        break;
      case 'regimenTransformacionEnsamblePlanillas':
        this.formGroup.addControl('descripcionMotoparte', new FormControl('', [Validators.required]));
        this.formGroup.addControl('numeroMotoparte', new FormControl('', [Validators.required]));
        break;
      default:
        break;
    }

    this.formGroup.reset();
  }

}