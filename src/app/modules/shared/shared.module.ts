import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

@NgModule({
  declarations: [
  ],
  imports: [
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    MatIconModule,
    MatDialogModule
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
