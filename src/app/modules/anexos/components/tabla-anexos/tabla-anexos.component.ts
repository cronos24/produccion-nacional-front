import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component';
import { AnexarArchivoComponent } from '../anexar-archivo/anexar-archivo.component';
import { EliminarAnexoComponent } from '../eliminar-anexo/eliminar-anexo.component';

@Component({
  selector: 'app-tabla-anexos',
  templateUrl: './tabla-anexos.component.html',
  styleUrls: ['./tabla-anexos.component.scss']
})
export class TablaAnexosComponent implements OnInit {
  public busqueda: string;
  public adjuntos: any = [
    {
      'id': '1',
      'archivo': 'documento.pdf',
      'descripcion': 'descripcion 1',
      'fecha': '02/05/05'
    }
  ]


  @Input() anexoEmbebido: boolean = true;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  public onBuscar(): void {

  }

  public onSort(event: any): void {

  }
  public onEliminarAnexo(datos: any): void {
    this.dialogRef = this.dialog.open(EliminarAnexoComponent, { data: datos });

    this.dialogRef.afterClosed().subscribe((response: boolean) => {
      if (response) {
        console.log(response, datos)
        this.messageService.add({ severity: 'success', summary: 'Archivo eliminado' });
      }
    });
  }

  nuevoAnexo(): void {
    this.dialogRef = this.dialog.open(AnexarArchivoComponent, { data: { incluirDescripcion: true }, width: '350px' });
    this.dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        let formData = new FormData();
        // formData.append('file', body.archivoArrendamiento);
        // this.adjuntosService.post(formData).subscribe(() => {
        //   this.getSucursales();
        // });
        this.messageService.add({ severity: 'success', summary: 'Anexo subido con éxito' });
      }
    })
  }

  public openFile(path: string): void {
    window.open(
      // this.adjuntosService.getFile(path)
      '',
      "_blank");
  }
}
