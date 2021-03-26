import { Component, Input} from '@angular/core';


@Component({
  selector: 'app-caracteristicas-transformacion',
  templateUrl: './caracteristicas-transformacion.component.html',
  styleUrls: ['./caracteristicas-transformacion.component.scss']
})
export class CaracteristicasTransformacionComponent {

  @Input() public caracteristicasTransformacionActivar: boolean;

}
