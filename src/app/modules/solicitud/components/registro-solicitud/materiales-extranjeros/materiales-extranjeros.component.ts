import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  decimalValidator,
  mayorACeroValidator,
} from 'src/app/modules/shared/services/validadores';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMatExtranjerosNal } from '../../../interfaces/materiales.extranjeros.nacional.interface';

@Component({
  selector: 'app-materiales-extranjeros',
  templateUrl: './materiales-extranjeros.component.html',
  styleUrls: ['./materiales-extranjeros.component.scss'],
})
export class MaterialesExtranjerosComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IMatExtranjerosNal
  ) {
    this.crearFormulario();
    if (data) {
      setTimeout(() => {
        this.actulizarFormulario(data);
      }, 500);
    }
  }

  ngOnInit(): void {}

  private crearFormulario(): void {
    this.form = this.fb.group({
      id: [''],
      nombreTecnico: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      subpartida: ['', [Validators.required]],
      paisOrigen: ['', [Validators.required]],
      paisProcedencia: ['', [Validators.required]],
      undMedida: [
        '',
        [Validators.required, Validators.min(3), Validators.maxLength(50)],
      ],
      cantidad: [
        '',
        [Validators.required, mayorACeroValidator, decimalValidator(3)],
      ],
      valorCif: [
        '',
        [Validators.required, mayorACeroValidator, decimalValidator(2)],
      ],
      valorPlanta: [
        '',
        [Validators.required, mayorACeroValidator, decimalValidator(2)],
      ],
      verbo: ['POST'],
    });
  }

  private actulizarFormulario(data: IMatExtranjerosNal): void {
    this.form.setValue({ ...data });
    this.form.updateValueAndValidity();
  }
}
