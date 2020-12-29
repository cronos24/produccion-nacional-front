import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioSolicitudComponent } from './components/formulario-solicitud/formulario-solicitud.component';

import { ListarSolicutudComponent } from './components/listar-solicutud/listar-solicutud.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: 'listar', component: ListarSolicutudComponent },
  { path: 'formulario', component: FormularioSolicitudComponent },
  { path: 'crear', component: ListarSolicutudComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
