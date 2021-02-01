import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { HeaderModule } from '../header/header.module';
import { SharedModule } from '../shared/shared.module';

import { AdjuntarArchivoComponent } from './components/adjuntar-archivo/adjuntar-archivo.component';
import { CancelarSolicitudComponent } from './components/cancelar-solicitud/cancelar-solicitud.component';
import { FormularioPreSolicitudComponent } from './components/formulario-pre-solicitud/formulario-pre-solicitud.component';
import { FormularioSolicitudComponent } from './components/formulario-solicitud/formulario-solicitud.component';
import { InformativoComponent } from './components/informativo/informativo.component';
import { ListarSolicitudComponent } from './components/listar-solicitud/listar-solicitud.component';
import { MaestroSolicitudComponent } from './components/maestro-solicitud/maestro-solicitud.component';
import { ModalInsumosComponent } from './components/modal-insumos/modal-insumos.component';
import { CostosValorFabricaComponent } from './components/registro-solicitud/costos-valor-fabrica/costos-valor-fabrica.component';
import { CriteriosRegistroComponent } from './components/registro-solicitud/criterios-registro/criterios-registro.component';
import { DatosProductoComponent } from './components/registro-solicitud/datos-producto/datos-producto.component';
import { ProcesoProduccionComponent } from './components/registro-solicitud/proceso-produccion/proceso-produccion.component';
import { RegistroSolicitudComponent } from './components/registro-solicitud/registro-solicitud/registro-solicitud.component';
import { SolicitudRequerimientoComponent } from './components/solicitud-requerimiento/solicitud-requerimiento.component';
import { SolicitudService } from './services/solicitud.service';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { ModalComponent } from './util/modal/modal.component';

@NgModule({
  declarations: [
    AdjuntarArchivoComponent,
    CancelarSolicitudComponent,
    CostosValorFabricaComponent,
    CriteriosRegistroComponent,
    DatosProductoComponent,
    FormularioPreSolicitudComponent,
    FormularioSolicitudComponent,
    FormularioSolicitudComponent,
    InformativoComponent,
    ListarSolicitudComponent,
    MaestroSolicitudComponent,
    ModalComponent,
    ModalInsumosComponent,
    ProcesoProduccionComponent,
    RegistroSolicitudComponent,
    SolicitudRequerimientoComponent
  ],
  imports: [
    AccordionModule,
    CardModule,
    CheckboxModule,
    CommonModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    FormsModule,
    HeaderModule,
    InputNumberModule,
    InputTextModule,
    MatDialogModule,
    PaginatorModule,
    PaginatorModule,
    RadioButtonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    SharedModule,
    SharedModule,
    SharedModule,
    SolicitudRoutingModule,
    SolicitudRoutingModule,
    TableModule,
    TableModule,
    TooltipModule
  ],
  providers: [
    SolicitudService
  ]
})
export class SolicitudModule { }
