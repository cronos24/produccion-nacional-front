import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule
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
