import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { AnexarArchivoComponent } from './components/anexar-archivo/anexar-archivo.component';
import { EliminarAnexoComponent } from './components/eliminar-anexo/eliminar-anexo.component';
import { TablaAnexosComponent } from './components/tabla-anexos/tabla-anexos.component';
import { AnexoService } from './services/anexo/anexo.service';

@NgModule({
  declarations: [TablaAnexosComponent, AnexarArchivoComponent, EliminarAnexoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MatIconModule,
    PaginatorModule,
    MessageModule,
    MessagesModule,
  ],
  providers: [
    AnexoService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  exports: [
    TablaAnexosComponent,
    AnexarArchivoComponent
  ]
})
export class AnexosModule { }
