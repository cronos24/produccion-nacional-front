import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import moment from 'moment';
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-formulario-pre-solicitud',
  templateUrl: './formulario-pre-solicitud.component.html',
  styleUrls: ['./formulario-pre-solicitud.component.scss']
})
export class FormularioPreSolicitudComponent {

  @ViewChild('renovacionModal') public renovacionModalTemplate: TemplateRef<any>;

  public renovacion: boolean = false;
  public numberRegistro: string = null;
  public loading: boolean = false;
  public myForm: FormGroup;
  public document= [];

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
            title: 'El borrador ha sido creado con éxito.',
            description: 'Una vez terminado el total diligenciamiento <br/> del formulario, puede proceder a <strong>generar y firmar su solicitud.</strong><br/><br/>' +
              'Cuenta con <strong>30 dias para firmar</strong> el presente formulario,<br/>de lo contrario este sera borrado del sistema.',
            acceptButton: 'CONTINUAR'
          }
        });

        this.dialogRef.afterClosed().subscribe(() => {
          this.router.navigateByUrl(`/solicitud/registro/${respuesta.respuesta.radicado}/true`);
        });
      });
    }else{
      if (this.numberRegistro == null) {
        this.dialogRef = this.dialog.open(AlertComponent, {
          data: {
            type: 'warning',
            title: 'Atención',
            description: 'Debe indicar el Número de Registro de <br/> Producción Nacional Vigente que va a renovar',
            acceptButton: 'REGRESAR'
          }
        });
      }else{

        // this.loading = true;
        // this.solicitudService.getById(this.numberRegistro, {
        //   postfix: '/renovacion'
        // }).subscribe((response) => {
        //   let solicitud = response.respuesta as any;
        //   if (solicitud!= null) {
        //     console.log(solicitud);

        //     this.dialogRef = this.dialog.open(this.renovacionTemplate, {
        //       width: '450px'
        //     });
            
        //   }else{
        //     this.dialogRef = this.dialog.open(AlertComponent, {
        //       data: {
        //         type: 'warning',
        //         title: 'Atención',
        //         description: 'Debe indicar el Número de Registro de <br/> Producción Nacional Vigente que va a renovar',
        //         acceptButton: 'REGRESAR'
        //       }
        //     });
        //   }

        //     this.loading = false;
        // });


        let test = this.solicitudService.consultarRegistro(this.numberRegistro)

        if (test) {


          if (test.respuesta.registro.cantidadRenovaciones < 2) {
            let fecha_actual = moment(new Date());
            let fecha_vencimiento = moment(test.respuesta.registro.fechaVencimiento);

            const diff = fecha_vencimiento.diff(fecha_actual, 'days');

            if (diff >= 30 && diff <= 90) {

              this.document= test;
        
              this.dialogRef = this.dialog.open(this.renovacionModalTemplate, {
                width: '450px',
                //disableClose: true
              });               
              
           
            }else{

              let fecha_limite = moment(test['respuesta'].registro.fechaVencimiento).subtract(30, "d");
              let fecha_inicial = moment(test['respuesta'].registro.fechaVencimiento).subtract(90, "d");
  
              this.dialogRef = this.dialog.open(AlertComponent, {
                data: {
                  type: 'warning',
                  title: 'Atención',
                  description: 'El registro <strong>'+this.numberRegistro+'</strong> puede ser renovado<br/> a partir de '+ fecha_inicial.format("DD-MM-YYYY") +' y antes de '+ fecha_limite.format("DD-MM-YYYY"),
                  acceptButton: 'REGRESAR'
                }
              });
  
            }

          }else{
            
            this.dialogRef = this.dialog.open(AlertComponent, {
                data: {
                  type: 'warning',
                  title: 'Atención',
                  description: 'El registro <strong>'+this.numberRegistro+'</strong> no puede ser<br/> renovado más de 2 veces',
                  acceptButton: 'REGRESAR'
                }
              });            
            }
          
          
          
         

        }else{
          this.dialogRef = this.dialog.open(AlertComponent, {
            data: {
              type: 'error',
              title: 'Atención',
              description: 'El registro <strong>'+this.numberRegistro+'</strong> no arrojó ningun resultado.',
              acceptButton: 'REGRESAR'
            }
          });
        }       
        
                  
        
      }
    }
  }

  public finalizarSolicitud(){
    this.dialogRef = this.dialog.open(AlertComponent, {
      data: {
        type: 'info',
        title: 'Importante',
        description: '<ul><li>Dirijase a la casilla 7.1 y actualice la información<br/> y el contrato de la nueva maquila</li><li>Recuerde verificar que los costos no superen<br/> la variación del 5% -Art. 7 de la RESOLUCIÓN 331 del 2020-.</li></ul>',
        acceptButton: 'ACEPTAR'
      }
    });

    this.dialogRef.afterClosed().subscribe(result  => {

        this.router.navigateByUrl(`/solicitud/registro/${this.numberRegistro}/true`);

      // if (result) {
      //   this.dialogRef = this.dialog.open(AlertComponent, {
      //     data: {
      //       type: 'information',
      //       title: 'El borrador ha sido creado con éxito.',
      //       description: 'Una vez terminada la actualización de datos, puede<br/> proceder a <strong>generar y firmar su solicitud de renovación.</strong><br/><br/>Tiene Plazo hasta <strong>DD-MM-AA a las 11:59 pm para firmar</strong> el presente formulario, de lo contrario este séra borrado del sistema.',
      //       acceptButton: 'CONTINUAR'
      //     }
      //   });
      // }
      
    });
  }

  public toggleNoReg(e){   
    if (!e.checked) {
      this.numberRegistro = null;
    }   
  }

  public closeDialog(){
    console.log('this.document', this.document);
    let solicitud_fecha= 'DD-MM-AA';

      solicitud_fecha= this.document['respuesta'].registro.fechaVencimiento;
    
 
        this.dialogRef = this.dialog.open(AlertComponent, {
          data: {
            type: 'information',
            title: 'El borrador ha sido creado con éxito.',
            description: 'Puede proceder a <strong>generar y firmar su solicitud de renovación.</strong><br/><br/>Tiene Plazo hasta <strong>'+solicitud_fecha+' a las 11:59 pm para firmar</strong><br/> el presente formulario, de lo contrario este<br/> séra borrado del sistema.',
            acceptButton: 'CONTINUAR'
          }
        });      

       
   
  }

}
