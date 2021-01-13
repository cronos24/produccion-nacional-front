import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-solicitud-requerimiento',
  templateUrl: './solicitud-requerimiento.component.html',
  styleUrls: ['./solicitud-requerimiento.component.scss']
})
export class SolicitudRequerimientoComponent {

  public solicitudes;

  public constructor(
    public dialogRef: MatDialogRef<SolicitudRequerimientoComponent>) { }

  public onContinuar(): void {
    this.dialogRef.close();
  }

}
