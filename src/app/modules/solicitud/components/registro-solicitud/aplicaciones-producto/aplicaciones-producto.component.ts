import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-aplicaciones-producto',
  templateUrl: './aplicaciones-producto.component.html',
  styleUrls: ['./aplicaciones-producto.component.scss']
})
export class AplicacionesProductoComponent extends FormGeneric {

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'aplicacionesProducto';

}
