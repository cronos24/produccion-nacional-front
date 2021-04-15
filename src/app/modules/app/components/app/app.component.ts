import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Message, MessageService } from 'primeng/api';
import { IPagina } from 'src/app/interfaces/pagina.interface';
import { SolicitudRequerimientoComponent } from 'src/app/modules/solicitud/components/solicitud-requerimiento/solicitud-requerimiento.component';
import { Estado } from 'src/app/modules/solicitud/enums/estado.enum';
import { SolicitudService } from 'src/app/modules/solicitud/services/solicitud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public pagina: IPagina = {
    pagina: 1,
    registrosPorPagina: 1000
  };

  public constructor(
    private dialog: MatDialog,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private messageService: MessageService,
    private solicitudService: SolicitudService) {

    this.matIconRegistry.addSvgIcon(
      'exito-circular-negativo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/exito-circular-negativo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'informacion-circular-negativo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/informacion-circular-negativo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'buscar-circular-negativo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/buscar-circular-negativo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'ver-positivo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/ver-positivo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'pdf-positivo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/pdf-positivo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'carta-positivo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/carta-positivo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'papelera-positivo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/papelera-positivo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'copiar-positivo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/copiar-positivo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'menos-circular-positivo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/menos-circular-positivo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'adjunto-positivo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/adjunto-positivo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'documento',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/documento.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'informacion',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/informacion.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'cara-disgusto-negativo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/cara-disgusto-negativo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'check-negativo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/check-negativo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'error-negativo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/error-negativo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'descargar',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/descarga.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'editar-positivo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/editar-positivo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'flecha-abajo-positivo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/flecha-abajo-positivo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'cargando',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/cargando.svg')
    );
  }

  ngOnInit(): void {
    this.messageService.messageObserver.subscribe((message: Message) => {
      setTimeout(() => {
        this.messageService.clear(message.id);
      }, 30000);
    });

    this.solicitudService.get({
      queryParams: {
        solicitudEstado: this.estado['En requerimiento']
      }
    }).subscribe((response) => {
      let solicitudes = response.respuesta.solicitudes as any[];
      if (solicitudes.length > 0) {
        this.dialog.open(SolicitudRequerimientoComponent, {
          width: '40%',
          data: {
            solicitudes: solicitudes
          }
        });
      }
    });
  }

  public get estado(): typeof Estado {
    return Estado;
  }

}
