import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-costos-valor-fabrica',
  templateUrl: './costos-valor-fabrica.component.html',
  styleUrls: ['./costos-valor-fabrica.component.scss']
})
export class CostosValorFabricaComponent implements OnInit {

  @Input() valorTotalUnidadProducto: number = 535987;
  @Input() valorCalculadoMasCostosProduccion: number = 20000;
  public costosValorFabricaGroup: FormGroup = this.formBuilder.group({
    valorTotalUnidadProducto: [0, Validators.required],
    costosDirectosFabrica: [0, [Validators.required, Validators.pattern(/^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/)]],
    valorTransaccion: [0, 
      [
        Validators.required,
        Validators.pattern(/^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/),
        Validators.min(this.valorCalculadoMasCostosProduccion)]]
  });

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public get costosValorFabrica() {
    return this.costosValorFabricaGroup.controls;
  }

}
