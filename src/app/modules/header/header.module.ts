import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './components/header/header.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { HeaderAdministracionComponent } from './components/header-administracion/header-administracion.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SubHeaderComponent,
    HeaderAdministracionComponent
  
  ],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports: [
    HeaderComponent,
    SubHeaderComponent,
    HeaderAdministracionComponent
  
  ]
})
export class HeaderModule { }
