import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { MaestroAdministracionComponent } from './components/maestro-administracion/maestro-administracion.component';
import { MenuComponent } from './components/menu/menu.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SharedModule } from 'primeng/api';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';


@NgModule({
  declarations: [MaestroAdministracionComponent, MenuComponent, InicioComponent],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    SharedModule,
    HeaderModule,
    FooterModule
  ]
})
export class AdministracionModule { }
