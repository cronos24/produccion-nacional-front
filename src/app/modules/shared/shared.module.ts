import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    MessageModule,
    MessagesModule
  ],
  exports: [
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    MessageModule,
    MessagesModule
  ],
  providers: [
  ]
})
export class SharedModule {
  public static forRoot(): {
    ngModule: typeof SharedModule;
    providers: (typeof MatIconRegistry)[];
  } {
    return {
      ngModule: SharedModule,
      providers: [
        MatIconRegistry
      ]
    };
  }
}
