import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-solicitud-requerimiento',
  templateUrl: './solicitud-requerimiento.component.html',
  styleUrls: ['./solicitud-requerimiento.component.scss']
})
export class SolicitudRequerimientoComponent {

  public solicitudes;

  public constructor(
    public dialogRef: MatDialogRef<SolicitudRequerimientoComponent>) { }

}
