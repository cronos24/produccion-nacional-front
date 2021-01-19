import { createElementCssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SolicitudService } from '../../services/solicitud.service';
import { ModalComponent } from '../../util/modal/modal.component';

@Component({
  selector: 'app-formulario-pre-solicitud',
  templateUrl: './formulario-pre-solicitud.component.html',
  styleUrls: ['./formulario-pre-solicitud.component.scss']
})
export class FormularioPreSolicitudComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      registro_vigente: [undefined, []],
      numero_registro: [undefined, []],
    });

    this.myForm.controls.numero_registro.disable()

  }

  crearBorrador() {
    console.log(this.myForm.controls.numero_registro.value)

    if (this.myForm.controls.registro_vigente.value) {

      if (this.myForm.controls.numero_registro.value) {

        this.getSolicitud();

      } else {
        this.openDialog(
          'info-warn',
          'Atención',
          "Debe indicar el Número de Registro de Producción Nacional Vigente que va a renovar.",
          'REGRESAR',
          undefined,
          undefined).subscribe(resp => {

          });
      }

    } else {
      this.solicitudService.post({}).toPromise().then(respuesta => {

        this.openDialog(
          'alert',
          'Atención',
          'Una vez terminado el total diligenciamiento del formulario, puede proceder a generar y firmar su solicitud.',
          undefined,
          'CONTINUAR',
          'Consecutivo ' + respuesta.radicado
          ).subscribe(resp => {
            if (resp) {
              this.router.navigate(['/solicitud/formulario/' + respuesta.radicado]);
            }
          });
      })

    }
  }

  getSolicitud() {
    this.solicitudService.getGenericById(this.myForm.controls.numero_registro.value).subscribe(resp => {

      let dia = parseInt(resp.fecha.substring(0, 2))
      let mes = parseInt(resp.fecha.substring(3, 5)) - 1
      let anho = parseInt(resp.fecha.substring(6, 10))

      let fechaDate = new Date(anho, mes, dia)

      let diferencia = (new Date().getTime() - fechaDate.getTime()) / (1000 * 60 * 60 * 24)

      if (diferencia < 30) {

        let fecha = new Date(fechaDate.getTime() + 2592000000)

        this.openDialog(
          'info-warn',
          'Atención',
          'El registro ' + this.myForm.controls.numero_registro.value + ' puede ser renovado a partir de ' + fecha.getDate() + '-' + fecha.getMonth() + '-' + fecha.getFullYear() + '.',
          'REGRESAR',
          undefined,
          undefined).subscribe(resp => {

          });

      } else {
        this.router.navigate(['/solicitud/formulario/' + this.myForm.controls.numero_registro.value]);
      }

    }, error => {
      this.openDialog(
        'info-warn',
        'Atención',
        "Debe indicar el Número de Registro de Producción Nacional Vigente que va a renovar.",
        'REGRESAR',
        undefined,
        undefined).subscribe(resp => {

        });

    })
  }


  openDialog(
    icon: string,
    title_modal: string,
    text_content: string,
    title_first_button: string,
    title_second_button: string,
    text_content_specific: string,


  ): Observable<any> {
    return new Observable((observer) => {

      const dialogRef = this.dialog.open(ModalComponent, {
        width: '500px',
        data: {
          title_first_button: title_first_button,
          title_second_button: title_second_button,
          text_content: text_content,
          text_content_specific: text_content_specific,
          title_modal: title_modal,
          icon: icon,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('The dialog was closed' + result)
          observer.next(true);
        } else {
          observer.next(false);
        }

      });
    })
  }


  habilitar() {
    debugger;
    if (this.myForm.controls.numero_registro.enabled) {
      this.myForm.controls.numero_registro.disable()
    } else {
      this.myForm.controls.numero_registro.enable()

    }
  }


}
