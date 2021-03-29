import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-datos-representante-legal',
  templateUrl: './datos-representante-legal.component.html',
  styleUrls: ['./datos-representante-legal.component.scss']
})
export class DatosRepresentanteLegalComponent extends FormGeneric {

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'datosRepresentante';

}
