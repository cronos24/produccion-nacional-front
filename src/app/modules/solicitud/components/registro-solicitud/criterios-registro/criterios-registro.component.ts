import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-criterios-registro',
  templateUrl: './criterios-registro.component.html',
  styleUrls: ['./criterios-registro.component.scss'],
})
export class CriteriosRegistroComponent extends FormGeneric implements OnInit {

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'criteriosRegistro';

  public bienesTotalmenteObtenidos: boolean = false;
  public bienesElaboradosNacionales: boolean = false;
  public bienesPorcentajeMinimoValor: boolean = false;
  public bienesProcesoProductivo: boolean = false;

  public nacional: boolean = false;
  public importado: boolean = false;
  public piezaInsumo: boolean = false;

  ngOnInit(): void {
    this.onSelectedCheckBox(this.getChildFormGroupValue('criterio'));
    this.onSelectedCheckBoxOrigen(this.getChildFormGroupValue('origenInsumo'));
  }

  public onSelectedCheckBox(criterio: string): void {
    setTimeout(() => {
      this.setChildFormGroupValue('criterio', criterio);

      this.bienesTotalmenteObtenidos = false;
      this.bienesElaboradosNacionales = false;
      this.bienesPorcentajeMinimoValor = false;
      this.bienesProcesoProductivo = false;

      this[criterio] = true;
      if (this.getFatherFormGroupValue('tipoFormulario') == 'regimenTransformacionEnsamblePlanillas') {
        this.getChildFormGroupControl('origenInsumo').setValidators([Validators.required]);
        if (criterio == 'bienesElaboradosNacionales') {
          this.setChildFormGroupValue('origenInsumo', 'nacional');
          this.nacional = true;
        } else {
          this.nacional = false;
          this.importado = false;
          this.piezaInsumo = false;
        }
      }
    });
  }

  public onSelectedCheckBoxOrigen(origenInsumo: string): void {
    setTimeout(() => {
      this.setChildFormGroupValue('origenInsumo', origenInsumo);

      this.nacional = false;
      this.importado = false;
      this.piezaInsumo = false;

      this[origenInsumo] = true;
    });
  }

  public onDecreto2680() {
    window.open('http://www.suin-juriscol.gov.co/viewDocument.asp?ruta=Decretos/1480087', '_blank')
  }

}
