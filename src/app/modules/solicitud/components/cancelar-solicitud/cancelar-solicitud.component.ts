import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component';

import { ISolicitud } from '../../interfaces/solicitud.interface';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-cancelar-solicitud',
  templateUrl: './cancelar-solicitud.component.html',
  styleUrls: ['./cancelar-solicitud.component.scss']
})
export class CancelarSolicitudComponent {

  public motivoFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10)
  ]);

  public constructor(
    private dialogRef: MatDialogRef<CancelarSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { solicitud: ISolicitud },
    private dialog: MatDialog,
    private messageService: MessageService,
    private solicitudService: SolicitudService) { }

  public onCancelar(): void {
    this.dialogRef.close();
  }

  public onContinuar(): void {
    if (this.motivoFormControl.valid) {
      this.solicitudService.cancelarSolicitud().subscribe(
        (): void => {
          this.messageService.add({ severity: 'success', summary: 'Solicitud de cancelación enviada con éxito' });
        },
        (): void => {
          this.dialog.open(AlertComponent, {
            data: {
              type: 'error',
              title: 'Atención',
              description: 'No fue posible realizar su solicitud<br />de cancelación. Por favor intente<br />de nuevo más tarde.',
              acceptButton: 'REGRESAR'
            }
          });
        }
      );
      this.dialogRef.close();
    }
  }

}
