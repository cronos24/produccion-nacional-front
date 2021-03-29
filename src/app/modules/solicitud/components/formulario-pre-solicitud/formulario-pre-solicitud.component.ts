import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-formulario-pre-solicitud',
  templateUrl: './formulario-pre-solicitud.component.html',
  styleUrls: ['./formulario-pre-solicitud.component.scss']
})
export class FormularioPreSolicitudComponent {

  public renovacion: boolean = false;

  public myForm: FormGroup;

  public constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    private solicitudService: SolicitudService,
    private router: Router,
  ) { }

  public crearBorrador() {
    if (!this.renovacion) {
      this.solicitudService.post(null).subscribe((respuesta) => {
        this.dialogRef = this.dialog.open(AlertComponent, {
          data: {
            type: 'information',
            title: 'El borrador ha sido creado con exito.',
            description: 'Una vez terminado el total diligenciamiento <br/> del formulario, puede proceder a <strong>generar y firmar su solicitud.</strong><br/><br/>' +
              'Cuenta con <strong>30 dias para firmar</strong> el presente formulario,<br/>de lo contrario este sera borrado del sistema.',
            acceptButton: 'CONTINUAR'
          }
        });

        this.dialogRef.afterClosed().subscribe(() => {
          this.router.navigateByUrl('/solicitud/registro');
        });
      });
    }
  }

}
