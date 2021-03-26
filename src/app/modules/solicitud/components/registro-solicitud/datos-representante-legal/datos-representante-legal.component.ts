import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-representante-legal',
  templateUrl: './datos-representante-legal.component.html',
  styleUrls: ['./datos-representante-legal.component.scss']
})
export class DatosRepresentanteLegalComponent {

  public datosRepresentanteGroup: FormGroup = this.formBuilder.group({
    nombreRepresentante: [, Validators.required],
    identificacion: [, Validators.required],
    cargo: [, Validators.required],
  });

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
