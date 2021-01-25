import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-informativo',
  templateUrl: './informativo.component.html',
  styleUrls: ['./informativo.component.scss']
})
export class InformativoComponent implements OnInit {
  

  constructor(
    private dialogRef: MatDialogRef<InformativoComponent>
  ) { }

  ngOnInit(): void {
  }

  public onCancelar(): void {
    this.dialogRef.close();
  }

  public onContinuar(): void {
    this.dialogRef.close();
  }


}
