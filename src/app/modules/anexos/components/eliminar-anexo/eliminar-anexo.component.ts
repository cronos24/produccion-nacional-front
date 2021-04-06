import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-anexo',
  templateUrl: './eliminar-anexo.component.html',
  styleUrls: ['./eliminar-anexo.component.scss']
})
export class EliminarAnexoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EliminarAnexoComponent>) { }

  public onContinuar(): void {
    this.dialogRef.close(true);
  }
  public onCancelar(): void {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
  }

}
