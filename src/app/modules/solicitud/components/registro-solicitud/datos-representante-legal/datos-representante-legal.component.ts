import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-representante-legal',
  templateUrl: './datos-representante-legal.component.html',
  styleUrls: ['./datos-representante-legal.component.scss']
})
export class DatosRepresentanteLegalComponent {

  public datosRepresentanteGroup: FormGroup = this.formBuilder.group({
    nombreRepresentante: ['', [Validators.required, Validators.maxLength(255)]],
    identificacion: ['', [Validators.required, Validators.maxLength(255)]],
    cargo: ['', [Validators.required, Validators.maxLength(255)]],
  });

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
