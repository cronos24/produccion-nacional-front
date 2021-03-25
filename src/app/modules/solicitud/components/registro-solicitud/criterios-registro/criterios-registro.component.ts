import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-criterios-registro',
  templateUrl: './criterios-registro.component.html',
  styleUrls: ['./criterios-registro.component.scss'],
})
export class CriteriosRegistroComponent implements OnInit {

  inTipoFormulario: string = '';
  mostrarInsumo: boolean = false;

  @Input()
  public set tipoFormulario(tipo: string) {
    this.inTipoFormulario = tipo;
    this.updateFormulario(tipo);
  }

  formularioCriterio: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formularioCriterio = this.fb.group({
      bienesTotal: [false],
      bienesElaborados: [false],
      porcentajeMinimo: [false],
      procesoProductivo: [false],
    });

    this.formularioCriterio.controls.bienesElaborados.valueChanges.subscribe(
      (x) => {
        if (x) {
          this.formularioCriterio.controls.porcentajeMinimo.disable();
          this.formularioCriterio.controls.procesoProductivo.disable();
        } else {
          this.formularioCriterio.controls.porcentajeMinimo.enable();
          this.formularioCriterio.controls.procesoProductivo.enable();
        }
      }
    );

    this.formularioCriterio.controls.porcentajeMinimo.valueChanges.subscribe(
      (x) => {
        if (x) {
          this.formularioCriterio.controls.porcentajeMinimo.disable();
          this.formularioCriterio.controls.procesoProductivo.disable();
        } else {
          this.formularioCriterio.controls.porcentajeMinimo.enable();
          this.formularioCriterio.controls.procesoProductivo.enable();
        }
      }
    );

    this.formularioCriterio.controls.procesoProductivo.valueChanges.subscribe(
      (x) => {
        if (x) {
          this.formularioCriterio.controls.porcentajeMinimo.disable();
          this.formularioCriterio.controls.procesoProductivo.disable();
        } else {
          this.formularioCriterio.controls.porcentajeMinimo.enable();
          this.formularioCriterio.controls.procesoProductivo.enable();
        }
      }
    );
  }

  updateFormulario(tipo: string) {

    this.mostrarInsumo = false;
    
    switch (tipo) {
      case 'produccionNacional':
        break;
      case 'fomentoIndustriaAutomotriz':
        this.formularioCriterio.controls.bienesTotal.disable();
        this.formularioCriterio.updateValueAndValidity();
        break;
      case 'regimenTransformacionEnsamblePlanillas':
        this.mostrarInsumo = true
        break;

      default:
        break;
    }
  }
}
