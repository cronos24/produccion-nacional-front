import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.addSvgIcon(
      'carta-positivo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/carta-positivo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'papelera-positivo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/papelera-positivo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'menos-circular-positivo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/menos-circular-positivo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'adjunto-positivo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/adjunto-positivo.svg')
    );
  }

}
