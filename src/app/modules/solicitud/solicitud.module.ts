import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../shared/shared.module';

import { ListarSolicutudComponent } from './components/listar-solicutud/listar-solicutud.component';
import { SolicitudRoutingModule } from './solicitud-routing.module';

@NgModule({
  declarations: [
    ListarSolicutudComponent
  ],
  imports: [
    CommonModule,
    SolicitudRoutingModule,
    TableModule,
    SharedModule
  ]
})
export class SolicitudModule { }
