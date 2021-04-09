import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-solicitud-requerimiento',
  templateUrl: './solicitud-requerimiento.component.html',
  styleUrls: ['./solicitud-requerimiento.component.scss']
})
export class SolicitudRequerimientoComponent {

  public solicitudes = [];

  public simple = false;

  public constructor(
    public dialogRef: MatDialogRef<SolicitudRequerimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.solicitudes) {
      this.solicitudes = data.solicitudes;
      this.simple = false;
    } else {
      this.solicitudes[0] = data.solicitud;
      this.simple = true;
    }
  }

}
