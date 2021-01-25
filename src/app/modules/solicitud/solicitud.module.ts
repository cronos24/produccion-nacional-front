import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../shared/shared.module';

import { CancelarSolicitudComponent } from './components/cancelar-solicitud/cancelar-solicitud.component';
import { ListarSolicitudComponent } from './components/listar-solicitud/listar-solicitud.component';
import { CriteriosRegistroComponent } from './components/registro-solicitud/criterios-registro/criterios-registro.component';
import { DatosProductoComponent } from './components/registro-solicitud/datos-producto/datos-producto.component';
import { ProcesoProduccionComponent } from './components/registro-solicitud/proceso-produccion/proceso-produccion.component';
import { RegistroSolicitudComponent } from './components/registro-solicitud/registro-solicitud/registro-solicitud.component';
import { SolicitudRequerimientoComponent } from './components/solicitud-requerimiento/solicitud-requerimiento.component';
import { SolicitudService } from './services/solicitud.service';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { AdjuntarArchivoComponent } from './components/adjuntar-archivo/adjuntar-archivo.component';
import { InformativoComponent } from './components/informativo/informativo.component';

@NgModule({
  declarations: [
    ListarSolicitudComponent,
    SolicitudRequerimientoComponent,
    CancelarSolicitudComponent,
    DatosProductoComponent,
    RegistroSolicitudComponent,
    CriteriosRegistroComponent,
    ProcesoProduccionComponent,
    AdjuntarArchivoComponent,
    InformativoComponent
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
