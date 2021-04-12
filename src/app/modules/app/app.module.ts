import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { HeaderModule } from '../header/header.module';
import { SharedModule } from '../shared/shared.module';
import { SolicitudService } from '../solicitud/services/solicitud.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    MessageService,
    SolicitudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
