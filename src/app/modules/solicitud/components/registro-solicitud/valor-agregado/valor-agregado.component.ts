import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-valor-agregado',
  templateUrl: './valor-agregado.component.html',
  styleUrls: ['./valor-agregado.component.scss']
})
export class ValorAgregadoComponent {

    @Input()
    public set valorAgregado(valor: number) {
      this.calcularAgregadoNacional (valor)
    }
   @Input() public sumaMaterialesImportados: number = 10000;
   @Input() public valorTransaccion: number = 20000;

   public agregadoNacional: number;

   ngOnInit(): void {

  }

    public calcularAgregadoNacional (valor: number){
      if (valor === 100){
        this.agregadoNacional = valor;
      }else{
        let agregado =  this.valorTransaccion - this.sumaMaterialesImportados;
        agregado = agregado / this.valorTransaccion;
        agregado = agregado * 100;
        this.agregadoNacional = agregado;
      }
  }

}
