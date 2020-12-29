import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../shared/shared.module';

import { ListarSolicutudComponent } from './components/listar-solicutud/listar-solicutud.component';
import { SolicitudService } from './services/solicitud.service';
import { SolicitudRoutingModule } from './solicitud-routing.module';

@NgModule({
  declarations: [
    ListarSolicutudComponent
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
