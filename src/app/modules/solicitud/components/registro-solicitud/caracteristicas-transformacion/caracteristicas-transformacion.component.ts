import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-caracteristicas-transformacion',
  templateUrl: './caracteristicas-transformacion.component.html',
  styleUrls: ['./caracteristicas-transformacion.component.scss']
})
export class CaracteristicasTransformacionComponent extends FormGeneric {

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'caracteristicasTransformacion';

}
