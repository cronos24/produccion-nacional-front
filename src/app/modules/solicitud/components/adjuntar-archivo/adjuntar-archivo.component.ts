import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adjuntar-archivo',
  templateUrl: './adjuntar-archivo.component.html',
  styleUrls: ['./adjuntar-archivo.component.scss']
})
export class AdjuntarArchivoComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AdjuntarArchivoComponent>
  ) { }

  ngOnInit(): void {
  }

  public onCancelar(): void {
    this.dialogRef.close();
  }

  public onSubirAnexo(): void {
    this.dialogRef.close();
  }


}
