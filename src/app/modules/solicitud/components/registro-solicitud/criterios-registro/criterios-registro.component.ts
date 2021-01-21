import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-criterios-registro',
  templateUrl: './criterios-registro.component.html',
  styleUrls: ['./criterios-registro.component.scss']
})
export class CriteriosRegistroComponent {

  @Input() public tipoFormulario: string;

}
