import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  decimalValidator,
  mayorACeroValidator
} from 'src/app/modules/shared/services/validadores';
import { IMatExtranjerosNal } from '../../../interfaces/materiales.extranjeros.nacional.interface';
import { DivipolaService } from '../../../services/divipola/divipola.service';
import { SubpartidaService } from '../../../services/subpartida/subpartida.service';

@Component({
  selector: 'app-materiales-extranjeros',
  templateUrl: './materiales-extranjeros.component.html',
  styleUrls: ['./materiales-extranjeros.component.scss'],
})
export class MaterialesExtranjerosComponent implements OnInit {

  public formGroup: FormGroup;
  public listaSubpartidas: any[];
  public listaTotalSubpartidas: any[];
  public listaPaises: any[];
  public listaTotalPaises: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IMatExtranjerosNal,
    private formBuilder: FormBuilder,
    private subpartidaService: SubpartidaService,
    private divipolaService: DivipolaService
  ) {
    this.listaTotalSubpartidas = this.subpartidaService.getSubpartida();
    this.listaSubpartidas = this.listaTotalSubpartidas;
    this.listaTotalPaises = this.divipolaService.consultarPaises();
    this.listaPaises = this.listaTotalPaises;
  }

  ngOnInit(): void {
    this.crearFormulario();
    if (this.data) {
      this.actulizarFormulario(this.data);
    }
  }
  
  public filtrarSubpartida(event: any): void {
    if (event.query.length > 3) {
      this.listaSubpartidas = this.listaTotalSubpartidas.filter((element: any) => element?.['numero-subpartida'].includes(event.query));
    } else {
      this.listaSubpartidas = [];
    }
  }

  public filtrarPaises(event: any): void {
    this.listaPaises = this.listaTotalPaises.filter((element: any) => element?.['nombre'].toLowerCase().includes(event.query.toLowerCase()));
  }

  private crearFormulario(): void {
    this.formGroup = this.formBuilder.group({
      id: [''],
      solicitudId: [''],
      cargueTipoId: ['manual'],
      cargueArchivoNombre: [''],
      tipoId: ['extranjero'],
      auditoria: [],
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
