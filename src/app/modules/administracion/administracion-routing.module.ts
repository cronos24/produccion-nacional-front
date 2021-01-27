import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CambioClaveComponent } from './components/cambio-clave/cambio-clave.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MaestroAdministracionComponent } from './components/maestro-administracion/maestro-administracion.component';
import { NavegacionGuard } from './guards/navegacion/navegacion.guard';

const routes: Routes = [
  {
    path: '',
    component: MaestroAdministracionComponent,
    children: [
      { path: '', redirectTo: 'opcionesGenerales', pathMatch: 'full' },
      {
        path: 'opcionesGenerales',
        children: [
          { path: '', redirectTo: 'inicio', pathMatch: 'full' },
          {
            path: 'inicio',
            component: InicioComponent
          },
          {
            path: 'cambioClave',
            component: CambioClaveComponent,
            canActivate: [NavegacionGuard]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
