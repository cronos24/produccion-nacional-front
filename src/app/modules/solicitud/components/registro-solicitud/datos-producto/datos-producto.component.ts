import { Component, Input } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-datos-producto',
  templateUrl: './datos-producto.component.html',
  styleUrls: ['./datos-producto.component.scss']
})
export class DatosProductoComponent {

  @Input() public tipoFormulario: string;

  public subpartidas: any[] = [];

  public messagesSubpartidaArancelaria: Message[] = [
    { severity: 'info', summary: '000 Descripcion de la subpartida' }
  ];

  public messagesCodigoNumericoUnico: Message[] = [
    { severity: 'info', summary: '000 Descripcion de la Codigo Numerico Unico (CNU)' }
  ];

}
