import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../shared/shared.module';

import { CancelarSolicitudComponent } from './components/cancelar-solicitud/cancelar-solicitud.component';
import { ListarSolicitudComponent } from './components/listar-solicitud/listar-solicitud.component';
import { SolicitudRequerimientoComponent } from './components/solicitud-requerimiento/solicitud-requerimiento.component';
import { SolicitudService } from './services/solicitud.service';
import { SolicitudRoutingModule } from './solicitud-routing.module';

@NgModule({
  declarations: [
    ListarSolicitudComponent,
    SolicitudRequerimientoComponent,
    CancelarSolicitudComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginatorModule,
    ReactiveFormsModule,
    SharedModule,
    SolicitudRoutingModule,
    TableModule
  ],
  providers: [
    SolicitudService
  ]
})
export class SolicitudModule { }
