import { SUPER_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { SubpartidaPorTipoService } from '../../../services/subpartida/subpartida-por-tipo.service';
import { SubpartidaService } from '../../../services/subpartida/subpartida.service';
import { VuceService } from '../../../services/vuce/vuce.service';
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

  public constructor(private subpartidaService: SubpartidaService,
    private subpartidaPorTipoService: SubpartidaPorTipoService) {
    super();
  }

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
          this.obtenerSubpartidas();
          break;
        case 'fomentoIndustriaAutomotriz' || 'fomentoIndustriaAstilleros':
          this.getChildFormGroupControl('codigoNumericoUnico').setValidators([Validators.required]);
          this.getChildFormGroupControl('tecnologia').setValidators([Validators.required]);
          this.obtenerSubpartidasFiltradas(tipoFormulario);
          break;
        case 'regimenTransformacionEnsamblePlanillas':
          this.getChildFormGroupControl('descripcionMotoparte').setValidators([Validators.required]);
          this.getChildFormGroupControl('numeroMotoparte').setValidators([Validators.required]);
          this.obtenerSubpartidas();
          break;
        default:
          break;
      }
    });
  }

  public obtenerSubpartidas(): void {
    this.subpartidas = this.subpartidaService.getSubpartida();
    console.log(this.subpartidas);
  }

  public obtenerSubpartidasFiltradas(tipo: string): void {
      this.subpartidaPorTipoService.get()
  }
}
