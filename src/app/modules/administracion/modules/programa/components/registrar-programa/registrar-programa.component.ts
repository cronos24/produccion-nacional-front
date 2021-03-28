import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component';
import { CancelarSolicitudComponent } from 'src/app/modules/solicitud/components/cancelar-solicitud/cancelar-solicitud.component';
import { ISolicitud } from 'src/app/modules/solicitud/interfaces/solicitud.interface';
import { SolicitudService } from 'src/app/modules/solicitud/services/solicitud.service';

@Component({
  selector: 'app-registrar-programa',
  templateUrl: './registrar-programa.component.html',
  styleUrls: ['./registrar-programa.component.scss']
})
export class RegistrarProgramaComponent {

 
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
    /*if (this.motivoFormControl.valid) {
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
    }*/
  }

}
