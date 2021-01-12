import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../shared/shared.module';

import { ListarSolicutudComponent } from './components/listar-solicutud/listar-solicutud.component';
import { SolicitudService } from './services/solicitud.service';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SolicitudRequerimientoComponent } from './components/solicitud-requerimiento/solicitud-requerimiento.component';
import { CancelarSolicitudComponent } from './components/cancelar-solicitud/cancelar-solicitud.component';

@NgModule({
  declarations: [
    ListarSolicutudComponent,
    SolicitudRequerimientoComponent,
    CancelarSolicitudComponent
  ],
  imports: [
    CommonModule,
    SolicitudRoutingModule,
    TableModule,
    PaginatorModule,
    SharedModule
  ],
  providers: [
    SolicitudService
  ]
})
export class SolicitudModule { }
