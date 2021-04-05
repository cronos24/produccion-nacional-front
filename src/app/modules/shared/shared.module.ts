import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';

import { AlertComponent } from './components/alert/alert.component';
import { TablaComponent } from './components/tabla/tabla.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AlertComponent,
    TablaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    MessageModule,
    MessagesModule,
    MatInputModule,
    TableModule,
    MatFormFieldModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TablaComponent,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    MessageModule,
    MessagesModule,
    MatInputModule,
    TableModule,
    MatFormFieldModule
  ],
  providers: [
  ],
  schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
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
