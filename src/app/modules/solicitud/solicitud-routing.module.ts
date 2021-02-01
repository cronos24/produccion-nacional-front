import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormularioPreSolicitudComponent } from './components/formulario-pre-solicitud/formulario-pre-solicitud.component';
import { FormularioSolicitudComponent } from './components/formulario-solicitud/formulario-solicitud.component';
import { ListarSolicitudComponent } from './components/listar-solicitud/listar-solicitud.component';
import { MaestroSolicitudComponent } from './components/maestro-solicitud/maestro-solicitud.component';
import { RegistroSolicitudComponent } from './components/registro-solicitud/registro-solicitud/registro-solicitud.component';

const routes: Routes = [
  { path: 'formulario', component: FormularioSolicitudComponent },
  { path: 'formulario/:id', component: FormularioSolicitudComponent },
  { path: 'pre-solicitud', component: FormularioPreSolicitudComponent },
  {
    path: '',
    component: MaestroSolicitudComponent,
    children: [
      { path: '', redirectTo: 'listar', pathMatch: 'full' },
      { path: 'listar', component: ListarSolicitudComponent },
      { path: 'registro', component: RegistroSolicitudComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
