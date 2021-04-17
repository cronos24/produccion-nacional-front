import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-costos-valor-fabrica',
  templateUrl: './costos-valor-fabrica.component.html',
  styleUrls: ['./costos-valor-fabrica.component.scss']
})
export class CostosValorFabricaComponent extends FormGeneric implements OnInit {

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'costosValorFabrica';

  constructor(private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    (this.getFatherFormGroupControl('materialesNacionales') as FormGroup).controls.valorTotalUnidadProducto.valueChanges.subscribe((valorTotalUnidadProducto: any) => {
      this.setChildFormGroupValue('valorTotalUnidadProducto', valorTotalUnidadProducto);
    });
  }

  public onChangeValorTransaccion(value): void {
    let suma = +this.getChildFormGroupValue('valorTotalUnidadProducto') +
      +this.getChildFormGroupValue('costosDirectosFabrica') +
      +(this.getFatherFormGroupControl('materialesExtranjerosNacionales') as FormGroup).controls.valorTotalPlanta.value;

    if (value < suma) {
      this.dialog.open(AlertComponent, {
        data: {
          type: 'warning',
          title: 'Atención',
          description: 'Verifique que 6.1 y 6.2 no estan vacios, y que el<br/>valor de 6.3 es mayor a la suma de:<br/>6.1 + 6.2 + 4.10',
          acceptButton: 'REGRESAR'
        }
      });
      this.setChildFormGroupValue('valorTransaccion', null);
    }
  }

}
