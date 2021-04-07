import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AnexoService } from '../../services/anexo/anexo.service';

@Component({
  selector: 'app-anexar-archivo',
  templateUrl: './anexar-archivo.component.html',
  styleUrls: ['./anexar-archivo.component.scss']
})
export class AnexarArchivoComponent {
  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService,
    private anexoService: AnexoService,
  ) { }

  @Input() public solicitudId: string;
  @Input() public labelConfirmar: string = 'SUBIR';
  @Input() public anidado: boolean = true;
  @Input() public mostrarErrorDescripcion: boolean = false;
  @Input() public mostrarDescripcion: boolean = false;
  @Output() public adjunto: EventEmitter<any> = new EventEmitter<any>();

  public errorTipo: boolean = false;
  public errorTamano: boolean = false;
  public adjuntoFormGroup: FormGroup = this.formBuilder.group({
    archivo: [null, [Validators.required]],
    descripcion: ['', [Validators.minLength(3), Validators.maxLength(50)]]
  })
  public archivoActual: any = {};

  public subirArchivo(event: any): void {
    this.errorTipo = false;
    this.errorTamano = false;
    if (event?.target?.files[0]?.type == 'application/pdf') {
      if (event.target.files[0].size <= 5000000) {
        this.archivoActual = event.target.files[0];
        if (this.anidado) {
          let datos: any = {
            archivo: this.archivoActual,
            descripcion: this.adjuntoFormGroup.controls.descripcion.value
          };
          this.adjunto.emit(datos);
        }
      } else {
        this.errorTamano = true;
        this.adjuntoFormGroup.controls.archivo.setValue(null);
      }
    } else {
      this.adjuntoFormGroup.controls.archivo.setValue(null);
    }
  }

  public adjuntarArchivo(): void {
    if (!this.adjuntoFormGroup.controls.descripcion.value) {
      this.mostrarErrorDescripcion = true;
    } else {
      this.mostrarErrorDescripcion = false;
      let datos: any = {
        archivo: this.archivoActual,
        descripcion: this.adjuntoFormGroup.controls.descripcion.value
      };
      if (this.anidado) {
        this.dialogRef.close(datos);
      }else {
        let formData = new FormData();
        formData.append('solicitudId', this.solicitudId);
        formData.append('nombre', datos.archivo.name);
        formData.append('file', datos.archivo);
        this.anexoService.post(formData).subscribe(() => {
          this.adjunto.emit();
          this.messageService.add({ severity: 'success', summary: 'Anexo subido con éxito' });
        });
      }
      this.adjuntoFormGroup.reset();
    }
  }

  public seleccionarArchivo(id: string): void {
    document.getElementById(id).click();
  }
}
