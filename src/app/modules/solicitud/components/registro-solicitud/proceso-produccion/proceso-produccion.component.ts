import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdjuntarArchivoComponent } from '../../adjuntar-archivo/adjuntar-archivo.component';
import { InformativoComponent } from '../../informativo/informativo.component';

@Component({
  selector: 'app-proceso-produccion',
  templateUrl: './proceso-produccion.component.html',
  styleUrls: ['./proceso-produccion.component.scss']
})
export class ProcesoProduccionComponent implements OnInit  {

  public maquila: boolean;

  public form = new FormGroup ({
    razonSocial: new FormControl('', [Validators.minLength(3), Validators.maxLength(300)]),
    nombreContacto: new FormControl('', [Validators.minLength(3), Validators.maxLength(6000)]),
    email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    telefono: new FormControl('', [Validators.required, Validators.min(7), Validators.maxLength(11)]),
  })

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
