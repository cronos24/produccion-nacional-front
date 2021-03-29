import { Component } from '@angular/core';

@Component({
  selector: 'app-registro-solicitud',
  templateUrl: './registro-solicitud.component.html',
  styleUrls: ['./registro-solicitud.component.scss']
})
export class RegistroSolicitudComponent {

  public produccionNacional: boolean = true;
  public fomentoIndustriaAutomotriz: boolean = false;
  public regimenTransformacionEnsamblePlanillas: boolean = false;
  public fomentoIndustriaAstilleros: boolean = false;

  public tipoFormulario: string = 'produccionNacional';

  constructor() { }

  public onSelectedCheckBox(tipoFormulario: string, value: boolean): void {
    this.tipoFormulario = tipoFormulario;

    this.produccionNacional = false;
    this.fomentoIndustriaAutomotriz = false;
    this.regimenTransformacionEnsamblePlanillas = false;
    this.fomentoIndustriaAstilleros = false;

    this[tipoFormulario] = true;
  }

}
