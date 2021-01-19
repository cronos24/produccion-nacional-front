import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../shared/shared.module';

import { ListarSolicutudComponent } from './components/listar-solicutud/listar-solicutud.component';
import { SolicitudService } from './services/solicitud.service';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { FormularioSolicitudComponent } from './components/formulario-solicitud/formulario-solicitud.component';
import { ModalInsumosComponent } from './components/modal-insumos/modal-insumos.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormularioPreSolicitudComponent } from './components/formulario-pre-solicitud/formulario-pre-solicitud.component';
import { ModalComponent } from './util/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ListarSolicutudComponent,
    FormularioSolicitudComponent,
    FormularioSolicitudComponent,
    ModalInsumosComponent,
    FormularioPreSolicitudComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    SolicitudRoutingModule,
    TableModule,
    SharedModule,
    CardModule,
    InputTextModule,
    FormsModule,
    CheckboxModule,
    AccordionModule,
    RadioButtonModule,
    TooltipModule,
    DropdownModule,
    DialogModule,
    InputNumberModule,
    ReactiveFormsModule,
    PaginatorModule,
    SharedModule,
    MatDialogModule
  ],
  providers: [
    SolicitudService
  ]
})
export class SolicitudModule { }
