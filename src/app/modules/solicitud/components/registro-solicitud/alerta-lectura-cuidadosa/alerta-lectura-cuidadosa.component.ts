import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component';

@Component({
  selector: 'app-alerta-lectura-cuidadosa',
  templateUrl: './alerta-lectura-cuidadosa.component.html',
  styleUrls: ['./alerta-lectura-cuidadosa.component.scss']
})
export class AlertaLecturaCuidadosaComponent {

 
  public constructor(
    private dialogRef: MatDialogRef<AlertComponent>) { }

  public onContinuar(): void {
    this.dialogRef.close(true);
  }

}
