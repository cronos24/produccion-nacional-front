import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarSolicitudComponent } from './components/listar-solicitud/listar-solicitud.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: 'listar', component: ListarSolicitudComponent },
  { path: 'crear', component: ListarSolicitudComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
