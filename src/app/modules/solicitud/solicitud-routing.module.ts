import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioPreSolicitudComponent } from './components/formulario-pre-solicitud/formulario-pre-solicitud.component';
import { FormularioSolicitudComponent } from './components/formulario-solicitud/formulario-solicitud.component';

import { ListarSolicutudComponent } from './components/listar-solicutud/listar-solicutud.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: 'listar', component: ListarSolicutudComponent },
  { path: 'formulario', component: FormularioSolicitudComponent },
  { path: 'formulario/:id', component: FormularioSolicitudComponent },
  { path: 'pre-solicitud', component: FormularioPreSolicitudComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
