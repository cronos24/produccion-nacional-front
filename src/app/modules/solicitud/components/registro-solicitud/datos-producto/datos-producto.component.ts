import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-datos-producto',
  templateUrl: './datos-producto.component.html',
  styleUrls: ['./datos-producto.component.scss'],
})
export class DatosProductoComponent extends FormGeneric implements OnInit {

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'datosProducto';

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

  ngOnInit(): void {
    this.getFatherFormGroupControl('tipoFormulario').valueChanges.subscribe((tipoFormulario: any) => {
      this.getChildFormGroupControl('descripcionMotoparte').setValidators([]);
      this.getChildFormGroupControl('numeroMotoparte').setValidators([]);
      this.getChildFormGroupControl('codigoNumericoUnico').setValidators([]);
      this.getChildFormGroupControl('tecnologia').setValidators([]);
      this.getChildFormGroupControl('resolucion').setValidators([]);
      this.getChildFormGroupControl('programa').setValidators([]);
      switch (tipoFormulario) {
        case 'produccionNacional':
          this.getChildFormGroupControl('resolucion').setValidators([Validators.required]);
          this.getChildFormGroupControl('programa').setValidators([Validators.required]);
          break;
        case 'fomentoIndustriaAutomotriz' || 'fomentoIndustriaAstilleros':
          this.getChildFormGroupControl('codigoNumericoUnico').setValidators([Validators.required]);
          this.getChildFormGroupControl('tecnologia').setValidators([Validators.required]);
          break;
        case 'regimenTransformacionEnsamblePlanillas':
          this.getChildFormGroupControl('descripcionMotoparte').setValidators([Validators.required]);
          this.getChildFormGroupControl('numeroMotoparte').setValidators([Validators.required]);
          break;
        default:
          break;
      }
    });
  }

}