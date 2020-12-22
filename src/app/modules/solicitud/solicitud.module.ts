import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../shared/shared.module';

import { ListarSolicutudComponent } from './components/listar-solicutud/listar-solicutud.component';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { FormularioSolicitudComponent } from './components/formulario-solicitud/formulario-solicitud.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { AccordionModule } from 'primeng/accordion';



@NgModule({
  declarations: [
    ListarSolicutudComponent,
    FormularioSolicitudComponent,
    FormularioSolicitudComponent
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
    AccordionModule
  ]
})
export class SolicitudModule { }
