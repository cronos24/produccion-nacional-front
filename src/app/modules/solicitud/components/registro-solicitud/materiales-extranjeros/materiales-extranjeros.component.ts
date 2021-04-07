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

  public formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IMatExtranjerosNal,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.crearFormulario();
    if (this.data) {
      console.log(this.data);
      
      this.actulizarFormulario(this.data);
    }
  }

  private crearFormulario(): void {
    this.formGroup = this.formBuilder.group({
      id: [''],
      nombreTecnico: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      subpartidaId: [null, [Validators.required]],
      paisOrigenId: ['', [Validators.required]],
      paisProcedenciaId: ['', [Validators.required]],
      unidadId: ['', [Validators.required]],
      cantidad: ['', [Validators.required, mayorACeroValidator, decimalValidator(3)]],
      valorCif: ['', [Validators.required, mayorACeroValidator, decimalValidator(2)]],
      valorPlanta: ['', [Validators.required, mayorACeroValidator, decimalValidator(2)]]
    });
  }

  private actulizarFormulario(data: IMatExtranjerosNal): void {
    this.formGroup.setValue({ ...data });
  }
  
}
