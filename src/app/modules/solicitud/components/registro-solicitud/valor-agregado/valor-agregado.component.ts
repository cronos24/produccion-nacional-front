import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-valor-agregado',
  templateUrl: './valor-agregado.component.html',
  styleUrls: ['./valor-agregado.component.scss']
})
export class ValorAgregadoComponent {
   @Input() public valorAgreagdo: number;

}
