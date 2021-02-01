import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramaRoutingModule } from './programa-routing.module';
import { ListarProgramasComponent } from './components/listar-programas/listar-programas.component';
import { RegistrarProgramaComponent } from './components/registrar-programa/registrar-programa.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ListarProgramasComponent, RegistrarProgramaComponent],
  imports: [
    CommonModule,
    ProgramaRoutingModule,
    TableModule,
    FormsModule,
    PaginatorModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class ProgramaModule { }
