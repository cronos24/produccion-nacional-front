import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'solicitud', pathMatch: 'full' },
  { path: 'solicitud', loadChildren: () => import('../solicitud/solicitud.module').then((module) => module.SolicitudModule) },
  { path: 'administracion', loadChildren: () => import('../administracion/administracion.module').then((module) => module.AdministracionModule) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
