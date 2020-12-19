import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    MatIconModule
  ],
  exports: [
    MatIconModule
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
