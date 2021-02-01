import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

import { HeaderModule } from '../header/header.module';
import { SharedModule } from '../shared/shared.module';

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
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
