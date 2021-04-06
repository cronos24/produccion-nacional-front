import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  decimalValidator,
  mayorACeroValidator
} from 'src/app/modules/shared/services/validadores';
import { IMatExtranjerosNal } from '../../../interfaces/materiales.extranjeros.nacional.interface';

@Component({
  selector: 'app-material-nacional',
  templateUrl: './material-nacional.component.html',
  styleUrls: ['./material-nacional.component.scss'],
})
export class MaterialNacionalComponent implements OnInit {

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
      solicitudId: [''],
      cargueTipoId: ['manual'],
      cargueArchivoNombre: [''],
      tipoId: ['nacional'],
      paisOrigenId: [''],
      paisProcedenciaId: [''],
      valorCif: [''],
      auditoria: [],
      nombreTecnico: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      subpartidaId: [null, [Validators.required]],
      unidadId: ['', [Validators.required]],
      cantidad: ['', [Validators.required, mayorACeroValidator, decimalValidator(3)]],
      valorPlanta: ['', [Validators.required, mayorACeroValidator, decimalValidator(2)]]
    });
  }

  private actulizarFormulario(data: IMatExtranjerosNal): void {
    this.formGroup.setValue({ ...data });
  }

}
