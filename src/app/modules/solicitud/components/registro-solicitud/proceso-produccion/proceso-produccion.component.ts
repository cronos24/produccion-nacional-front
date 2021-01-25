import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AdjuntarArchivoComponent } from '../../adjuntar-archivo/adjuntar-archivo.component';
import { InformativoComponent } from '../../informativo/informativo.component';

@Component({
  selector: 'app-proceso-produccion',
  templateUrl: './proceso-produccion.component.html',
  styleUrls: ['./proceso-produccion.component.scss']
})
export class ProcesoProduccionComponent implements OnInit  {

  public maquila: boolean;

  public constructor(
    private dialog: MatDialog
    ) { }

    public ngOnInit(): void {

    }

  public onAdjuntarArchivo(): void {
    this.dialog.open(AdjuntarArchivoComponent, {
        width: '450px',
    });
  }

  public onMensajeConfirmacion(): void {
    if (this.maquila === false) {
      this.dialog.open(InformativoComponent, {
        width: '450px',
    });
    }
  }

}
