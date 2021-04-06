import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaAnexosComponent } from './components/tabla-anexos/tabla-anexos.component';
import { AnexarArchivoComponent } from './components/anexar-archivo/anexar-archivo.component';
import { AnexosService } from '../solicitud/services/registro-solicitud/anexos/anexos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MatIconModule } from '@angular/material/icon';
import { EliminarAnexoComponent } from './components/eliminar-anexo/eliminar-anexo.component';



@NgModule({
  declarations: [TablaAnexosComponent, AnexarArchivoComponent, EliminarAnexoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MatIconModule
  ],
  providers: [
    AnexosService,
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
