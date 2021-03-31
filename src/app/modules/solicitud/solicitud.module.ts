import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { InformativoComponent } from './components/informativo/informativo.component';
import { ListarSolicitudComponent } from './components/listar-solicitud/listar-solicitud.component';
import { MaestroSolicitudComponent } from './components/maestro-solicitud/maestro-solicitud.component';
import { ModalInsumosComponent } from './components/modal-insumos/modal-insumos.component';
import { AgregarInsumosComponent } from './components/registro-solicitud/agregar-insumos/agregar-insumos.component';
import { AnexosComponent } from './components/registro-solicitud/anexos/anexos.component';
import { AplicacionesProductoComponent } from './components/registro-solicitud/aplicaciones-producto/aplicaciones-producto.component';
import { CaracteristicasTecnicasComponent } from './components/registro-solicitud/caracteristicas-tecnicas/caracteristicas-tecnicas.component';
import { CaracteristicasTransformacionComponent } from './components/registro-solicitud/caracteristicas-transformacion/caracteristicas-transformacion.component';
import { CostosValorFabricaComponent } from './components/registro-solicitud/costos-valor-fabrica/costos-valor-fabrica.component';
import { CriteriosRegistroComponent } from './components/registro-solicitud/criterios-registro/criterios-registro.component';
import { DatosProductoComponent } from './components/registro-solicitud/datos-producto/datos-producto.component';
import { DatosRepresentanteLegalComponent } from './components/registro-solicitud/datos-representante-legal/datos-representante-legal.component';
import { MaterialesExtranjerosNacionalesComponent } from './components/registro-solicitud/materiales-extranjeros-nacionales/materiales-extranjeros-nacionales.component';
import { ProcesoProduccionComponent } from './components/registro-solicitud/proceso-produccion/proceso-produccion.component';
import { RegistroSolicitudComponent } from './components/registro-solicitud/registro-solicitud/registro-solicitud.component';
import { ValorAgregadoComponent } from './components/registro-solicitud/valor-agregado/valor-agregado.component';
import { SolicitudRequerimientoComponent } from './components/solicitud-requerimiento/solicitud-requerimiento.component';
import { MaterialService } from './services/material.service';
import { AnexosService } from './services/registro-solicitud/anexos/anexos.service';
import { SolicitudService } from './services/solicitud.service';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { MaterialesExtranjerosComponent } from './components/registro-solicitud/materiales-extranjeros/materiales-extranjeros.component';

@NgModule({
  declarations: [
    AdjuntarArchivoComponent,
    CancelarSolicitudComponent,
    CostosValorFabricaComponent,
    CriteriosRegistroComponent,
    DatosProductoComponent,
    FormularioPreSolicitudComponent,
    InformativoComponent,
    ListarSolicitudComponent,
    MaestroSolicitudComponent,
    ModalInsumosComponent,
    ProcesoProduccionComponent,
    RegistroSolicitudComponent,
    SolicitudRequerimientoComponent,
    MaterialesExtranjerosNacionalesComponent,
    AgregarInsumosComponent,
    AplicacionesProductoComponent,
    CaracteristicasTecnicasComponent,
    CaracteristicasTransformacionComponent,
    DatosRepresentanteLegalComponent,
    ValorAgregadoComponent,
    AnexosComponent,
    MaterialesExtranjerosComponent
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
    SolicitudRoutingModule,
    SolicitudRoutingModule,
    TableModule,
    TableModule,
    TooltipModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    SolicitudService,
    AnexosService,
    MaterialService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SolicitudModule { }
