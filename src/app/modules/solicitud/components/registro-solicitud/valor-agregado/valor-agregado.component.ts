import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-valor-agregado',
  templateUrl: './valor-agregado.component.html',
  styleUrls: ['./valor-agregado.component.scss']
})
export class ValorAgregadoComponent extends FormGeneric {

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'valorAgregado';

  public get valor() {
    if ((this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['criterio'].value == 'bienesElaboradosNacionales') {
      return 100;
    }
    return 0;
  }
}

