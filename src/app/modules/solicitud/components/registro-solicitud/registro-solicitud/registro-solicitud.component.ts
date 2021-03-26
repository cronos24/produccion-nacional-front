import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';


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
  public caracteristicasTransformacionActivar: boolean;
  public valorAgreagdo: number;

  constructor(
    private router: Router,

  ){}

  public setOpcionesCheckCriteriosRegistro(opcionCheck: string) {
    switch (opcionCheck) {
      case 'procesoProductivo':
        this.caracteristicasTransformacionActivar = true;
        break;
      case 'noprocesoProductivo':
        this.caracteristicasTransformacionActivar = false;
        break;
      case 'bienesElaborados':
        this.valorAgreagdo = 100;
        break;
      case 'nobienesElaborados':
        this.valorAgreagdo = 0.00;
        break;
    }
  }

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

  public listarSolicitud() {
    this.router.navigate(['solicitud/listar']);
  }

}
