import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AlertComponent>) { }

  public onContinuar(): void {
    this.dialogRef.close(true);
  }

  public get icon(): string {
    if (this.data.icono) {
      return this.data.icono
    }
    switch (this.data.type) {
      case 'error':
        return 'error-negativo';
      case 'warning':
        return 'cara-disgusto-negativo';
      default:
        return '';
    }
  }
}
