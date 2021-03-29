import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-caracteristicas-tecnicas',
  templateUrl: './caracteristicas-tecnicas.component.html',
  styleUrls: ['./caracteristicas-tecnicas.component.scss']
})
export class CaracteristicasTecnicasComponent extends FormGeneric{

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'caracteristicasTecnicas';

}
