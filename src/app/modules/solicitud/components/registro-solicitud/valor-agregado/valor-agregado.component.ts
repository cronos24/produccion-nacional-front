import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-valor-agregado',
  templateUrl: './valor-agregado.component.html',
  styleUrls: ['./valor-agregado.component.scss']
})
export class ValorAgregadoComponent extends FormGeneric implements OnInit {

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'valorAgregado';

  ngOnInit(): void {
    (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['criterio'].valueChanges.subscribe((criterio) => {
      if (criterio == 'bienesElaboradosNacionales') {
        this.setChildFormGroupValue('valor', '100');
      } else {
        let valorTotalCif = (this.getFatherFormGroupControl('materialesExtranjerosNacionales') as FormGroup).controls['valorTotalCif'].value;
        let valorTransaccion = (this.getFatherFormGroupControl('costosValorFabrica') as FormGroup).controls['valorTransaccion'].value;
        this.setValor(valorTransaccion, valorTotalCif);
      }
    });

    (this.getFatherFormGroupControl('materialesExtranjerosNacionales') as FormGroup).controls['valorTotalCif'].valueChanges.subscribe((valorTotalCif) => {
      let valorTransaccion = (this.getFatherFormGroupControl('costosValorFabrica') as FormGroup).controls['valorTransaccion'].value;
      this.setValor(valorTransaccion, valorTotalCif);
    });

    (this.getFatherFormGroupControl('costosValorFabrica') as FormGroup).controls['valorTransaccion'].valueChanges.subscribe((valorTransaccion) => {
      let valorTotalCif = (this.getFatherFormGroupControl('materialesExtranjerosNacionales') as FormGroup).controls['valorTotalCif'].value;
      this.setValor(valorTransaccion, valorTotalCif);
    });
  }

  public setValor(valorTransaccion: number, valorTotalCif: number): void {
    let valor = ((valorTransaccion - valorTotalCif) / valorTransaccion) * 100;
    valor = +valor.toFixed(2);

    this.setChildFormGroupValue('valor', '' + valor);
  }
}

