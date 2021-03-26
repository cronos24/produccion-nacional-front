import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-criterios-registro',
  templateUrl: './criterios-registro.component.html',
  styleUrls: ['./criterios-registro.component.scss']
})
export class CriteriosRegistroComponent {

  @Input() public tipoFormulario: string;

  public mostrarRegistro: boolean = false;
  public mostrarRegistroNacional: boolean = false;
  public mostrarRegistroNoNacional: boolean = false;
  public bienesTotalmenteObtenidos: boolean = false;
  public porcentajeMinimoValorAgregadoNacional: boolean = false;
  public bienesElaboradosMateriasNacionales: boolean = false;
  public procesoProductivoSustancial: boolean = false;
  public nacional: boolean = false;
  public importadoMonopartista: boolean = false;
  public suministradoEnsambladora: boolean = false;

  public tipoFormularioCheck: string;

  public onSelectedCheckBox(tipoFormularioCheck: string, value: boolean): void {
     this.tipoFormularioCheck = tipoFormularioCheck;
    if (tipoFormularioCheck === 'bienesTotalmenteObtenidos') {
        this.porcentajeMinimoValorAgregadoNacional = false;
        this.bienesElaboradosMateriasNacionales = false;
        this.procesoProductivoSustancial = false;
        this.mostrarRegistroNacional = false;
      } else if (tipoFormularioCheck === 'porcentajeMinimoValorAgregadoNacional') {
        this.bienesTotalmenteObtenidos = false;
        this.bienesElaboradosMateriasNacionales = false;
        this.procesoProductivoSustancial = false;
        this.mostrarRegistro = true;
        this.mostrarRegistroNacional = false;
        this.mostrarRegistroNoNacional = true;
        this.nacional = false;
      } else if (tipoFormularioCheck === 'bienesElaboradosMateriasNacionales') {
        this.bienesTotalmenteObtenidos = false;
        this.porcentajeMinimoValorAgregadoNacional = false;
        this.procesoProductivoSustancial = false;
        this.nacional = true;
        this.mostrarRegistro = true;
        this.mostrarRegistroNoNacional = false;
        this.mostrarRegistroNacional = true;
      }else if (tipoFormularioCheck === 'procesoProductivoSustancial') {
        this.bienesTotalmenteObtenidos = false;
        this.porcentajeMinimoValorAgregadoNacional = false;
        this.bienesElaboradosMateriasNacionales = false;
        this.nacional = false;
        this.mostrarRegistro = true;
        this.mostrarRegistroNacional = false;
        this.mostrarRegistroNoNacional = true;
      }
      else if (tipoFormularioCheck === 'importadoMonopartista') {
        this.nacional = false;
        this.suministradoEnsambladora = false;
      }
      else if (tipoFormularioCheck === 'suministradoEnsambladora') {
        this.nacional = false;
        this.importadoMonopartista = false;
      }

  }

}
