import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterAdministracionComponent } from './components/footer-administracion/footer-administracion.component';



@NgModule({
  declarations: [FooterAdministracionComponent],
  imports: [
    CommonModule
  ],
  exports: [FooterAdministracionComponent]
})
export class FooterModule { }
