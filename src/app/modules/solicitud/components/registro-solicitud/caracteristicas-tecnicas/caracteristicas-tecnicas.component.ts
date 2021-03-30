import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-caracteristicas-tecnicas',
  templateUrl: './caracteristicas-tecnicas.component.html',
  styleUrls: ['./caracteristicas-tecnicas.component.scss']
})
export class CaracteristicasTecnicasComponent {

  public caracteristicasTecnicasGroup: FormGroup = this.formBuilder.group({
    descripcion: ['', [Validators.required, Validators.maxLength(32000)]],
  });

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
