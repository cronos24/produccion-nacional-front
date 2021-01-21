import { Component } from '@angular/core';

@Component({
  selector: 'app-registro-solicitud',
  templateUrl: './registro-solicitud.component.html',
  styleUrls: ['./registro-solicitud.component.scss']
})
export class RegistroSolicitudComponent {

  public produccionNacional: boolean = false;
  public fomentoIndustriaAutomotriz: boolean = false;
  public regimenTransformacionEnsamblePlanillas: boolean = false;

  public tipoFormulario: string;

  public onSelectedCheckBox(tipoFormulario: string, value: boolean): void {

    if (value) {
      this.tipoFormulario = tipoFormulario;

      if (tipoFormulario === 'produccionNacional') {
        this.fomentoIndustriaAutomotriz = false;
        this.regimenTransformacionEnsamblePlanillas = false;
      } else if (tipoFormulario === 'fomentoIndustriaAutomotriz') {
        this.produccionNacional = false;
        this.regimenTransformacionEnsamblePlanillas = false;
      } else {
        this.produccionNacional = false;
        this.fomentoIndustriaAutomotriz = false;
      }
    } else {
      this.tipoFormulario = undefined;
    }
  }

}
