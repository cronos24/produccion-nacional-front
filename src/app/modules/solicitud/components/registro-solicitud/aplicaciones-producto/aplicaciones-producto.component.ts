import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-aplicaciones-producto',
  templateUrl: './aplicaciones-producto.component.html',
  styleUrls: ['./aplicaciones-producto.component.scss']
})
export class AplicacionesProductoComponent {

  public aplicacionesProductoGroup: FormGroup = this.formBuilder.group({
    descripcion: ['', [Validators.maxLength(32000)]],
  });

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
