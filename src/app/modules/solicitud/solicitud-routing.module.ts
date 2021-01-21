import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarSolicitudComponent } from './components/listar-solicitud/listar-solicitud.component';
import { RegistroSolicitudComponent } from './components/registro-solicitud/registro-solicitud/registro-solicitud.component';

const routes: Routes = [
  { path: '', redirectTo: 'registro', pathMatch: 'full' },
  { path: 'listar', component: ListarSolicitudComponent },
  { path: 'registro', component: RegistroSolicitudComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
