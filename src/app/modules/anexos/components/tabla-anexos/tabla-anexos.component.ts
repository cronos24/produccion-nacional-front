import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IPagina } from 'src/app/interfaces/pagina.interface';
import { Estado } from 'src/app/modules/solicitud/enums/estado.enum';
import { SolicitudService } from 'src/app/modules/solicitud/services/solicitud.service';
import { AnexoService } from '../../services/anexo/anexo.service';
import { AnexarArchivoComponent } from '../anexar-archivo/anexar-archivo.component';
import { EliminarAnexoComponent } from '../eliminar-anexo/eliminar-anexo.component';

@Component({
  selector: 'app-tabla-anexos',
  templateUrl: './tabla-anexos.component.html',
  styleUrls: ['./tabla-anexos.component.scss']
})
export class TablaAnexosComponent {
  
  @Input() anexoEmbebido: boolean = true;

  public busqueda: string;
  public pagina: IPagina = {
    pagina: 0,
    registrosPorPagina: 10
  };
  public sort: { [key: string]: string };

  public adjuntos: any[] = [];
  public solicitud: any;
  public loading: boolean = false;

  public get estado(): typeof Estado {
    return Estado;
  }

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private messageService: MessageService,
    private anexoService: AnexoService,
    private solicitudService: SolicitudService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const radicado = this.activatedRoute.snapshot.paramMap.get('radicado');

    this.loading = true;
    this.solicitudService.getById(radicado, {
      postfix: '/radicado'
    }).subscribe((response) => {
      this.solicitud = (response.respuesta as any);
      this.getAnexos();
      this.loading = false;
    });
  }

  public onBuscar(): void {
    this.getAnexos();
  }

  public onSort(event: {
    sortField: string;
    sortOrder: number;
  }): void {
    if (this.solicitud.id) {
      this.sort = {
        ordenamientoCampo: event.sortField,
        ordenamientoDireccion: event.sortOrder === 1 ? 'ASC' : 'DESC'
      };
      this.getAnexos();
    }
  }

  public onPageChange(event: {
    page: number
  }): void {
    if (this.pagina.pagina !== event.page + 1) {
      this.pagina.pagina = event.page + 1;
      this.getAnexos();
    }
  }

  public getAnexos(): void {
    this.anexoService.get({
      queryParams: {
        solicitudId: this.solicitud.id,
        general: this.busqueda
      },
      sort: this.sort,
      pagina: this.pagina
    }).subscribe((respuesta) => {
      this.adjuntos = respuesta.respuesta.datos as any[]
    });
  }

  public onEliminarAnexo(datos: any): void {
    this.dialogRef = this.dialog.open(EliminarAnexoComponent, { data: datos });

    this.dialogRef.afterClosed().subscribe((response: boolean) => {
      if (response) {
        this.anexoService.delete(datos.id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Archivo eliminado' });
          this.getAnexos();
        });
      }
    });
  }

  public nuevoAnexo(): void {
    this.dialogRef = this.dialog.open(AnexarArchivoComponent, { data: { incluirDescripcion: true }, width: '350px' });
    this.dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        let formData = new FormData();
        formData.append('solicitudId', this.solicitud.id);
        formData.append('nombre', data.archivo.name);
        formData.append('file', data.archivo);
        this.anexoService.post(formData).subscribe(() => {
          this.getAnexos();
          this.messageService.add({ severity: 'success', summary: 'Anexo subido con éxito' });
        });
      }
    })
  }

  public getPath(path: string): string {
    return this.anexoService.getFile(path);
  }

  public navigate(): void{
    this.router.navigateByUrl('/solicitud/listar');
  }

}
