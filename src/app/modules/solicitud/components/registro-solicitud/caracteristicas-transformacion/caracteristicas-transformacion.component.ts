import { Component, Input} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-caracteristicas-transformacion',
  templateUrl: './caracteristicas-transformacion.component.html',
  styleUrls: ['./caracteristicas-transformacion.component.scss']
})
export class CaracteristicasTransformacionComponent {

  @Input() public caracteristicasTransformacionActivar: boolean;

  public caracteristicasTransformacionGroup: FormGroup = this.formBuilder.group({
    descripcion: [, Validators.required],
  });

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
