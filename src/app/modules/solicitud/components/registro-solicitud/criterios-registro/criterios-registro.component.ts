import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-criterios-registro',
  templateUrl: './criterios-registro.component.html',
  styleUrls: ['./criterios-registro.component.scss'],
})
export class CriteriosRegistroComponent implements OnInit {

  @Input() public set tipoFormulario(tipo: string) {
    this._tipoFormulario = tipo;
    //this.actualizarFormulario(tipo);
  }
  public get tipoFormulario(): string {
    return this._tipoFormulario;
  }

  public _tipoFormulario: string;

  public bienesTotalmenteObtenidos: boolean = false;
  public bienesElaboradosNacionales: boolean = false;
  public bienesPorcentajeMinimoValor: boolean = false;
  public bienesProcesoProductivo: boolean = false;

  public critero: string;

  constructor() { }

  ngOnInit(): void { }


  public onSelectedCheckBox(critero: string, value: boolean): void {
    this.critero = critero;

    this.bienesTotalmenteObtenidos = false;
    this.bienesElaboradosNacionales = false;
    this.bienesPorcentajeMinimoValor = false;
    this.bienesProcesoProductivo = false;

    this[critero] = true;
  }

  public onDecreto2680() {
    window.open('http://www.suin-juriscol.gov.co/viewDocument.asp?ruta=Decretos/1480087', '_blank')
  }
}
