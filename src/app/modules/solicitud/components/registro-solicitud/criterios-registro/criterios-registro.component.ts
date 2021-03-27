import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criterios-registro',
  templateUrl: './criterios-registro.component.html',
  styleUrls: ['./criterios-registro.component.scss'],
})
export class CriteriosRegistroComponent implements OnInit {

  public mostrarFormulario: boolean = false;
  inTipoFormulario: string = '';
  mostrarInsumo: boolean = false;
  mostrarDecreto1122: boolean = false;
  inactivoIconBienes: boolean = false;
  inactivoPorcentajeMinimo: boolean = false;
  inactivoBienesElaborados: boolean = false;
  inactivoProcesoProductivo: boolean = false;
  criterio: any;
  criterioSeleccionado: string = '';

  @Input()
  public set tipoFormulario(tipo: string) {
    this.inTipoFormulario = tipo;
    this.updateFormulario(this.inTipoFormulario);
  }

  @Output() oncriterio = new EventEmitter<any>();

  formularioCriterio: FormGroup;
  formularioInsumo: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.formularioCriterio = this.fb.group({
      bienesTotal: [false],
      bienesElaborados: [false],
      porcentajeMinimo: [false],
      procesoProductivo: [false],
    });

    this.formularioInsumo = this.fb.group({
      nacional: [false],
      importado: [false],
      piezaInsumo: [false],
    });

    this.criterio = {
      frmCriterio: this.formularioCriterio,
      frmIsumo: this.formularioInsumo,
    };

    this.oncriterio.emit(this.criterio);

    this.formularioCriterio.controls.bienesTotal.valueChanges.subscribe(
      (x) => {
        if (this.inTipoFormulario == 'produccionNacional') {
          if (x) {
            this.criterioSeleccionado = 'bienesTotal';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriterio.controls.bienesElaborados.setValue(false);
            this.formularioCriterio.controls.porcentajeMinimo.setValue(false);
            this.formularioCriterio.controls.procesoProductivo.setValue(false);
          } else {
            this.criterioSeleccionado = 'nobienesTotal';
            this.oncriterio.emit(this.criterioSeleccionado);
          }
        }
        this.formsupdateValueAndValidity();
      }
    );

    this.formularioCriterio.controls.bienesElaborados.valueChanges.subscribe(
      (x) => {
        if (this.inTipoFormulario == 'produccionNacional') {
          if (x) {
            this.criterioSeleccionado = 'bienesElaborados';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriterio.controls.bienesTotal.setValue(false);
            this.formularioCriterio.controls.porcentajeMinimo.setValue(false);
            this.formularioCriterio.controls.procesoProductivo.setValue(false);
          } else {
            this.criterioSeleccionado = 'nobienesElaborados';
            this.oncriterio.emit(this.criterioSeleccionado);
          }
        }
        this.formsupdateValueAndValidity();
      }
    );

    this.formularioCriterio.controls.porcentajeMinimo.valueChanges.subscribe(
      (x) => {
        if (this.inTipoFormulario == 'produccionNacional') {
          if (x) {
            this.criterioSeleccionado = 'porcentajeMinimo';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriteriovalueChanges();
            this.formularioCriterio.controls.bienesTotal.setValue(false);
            this.formularioCriterio.controls.bienesElaborados.setValue(false);
            this.formularioCriterio.controls.procesoProductivo.setValue(false);
          }
          else {
            this.criterioSeleccionado = 'procesoProductivo';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriteriovalueChanges();
          }
        }
        this.formsupdateValueAndValidity();
      }
    );

    this.formularioCriterio.controls.procesoProductivo.valueChanges.subscribe(
      (x) => {
        if (this.inTipoFormulario == 'produccionNacional') {
          if (x) {
            this.criterioSeleccionado = 'procesoProductivo';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriteriovalueChanges();
            this.formularioCriterio.controls.bienesTotal.setValue(false);
            this.formularioCriterio.controls.bienesElaborados.setValue(false);
            this.formularioCriterio.controls.porcentajeMinimo.setValue(false);
          } else {
            this.criterioSeleccionado = 'noprocesoProductivo';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriteriovalueChanges();
          }
        }
        this.formsupdateValueAndValidity();
      }
    );

    this.formularioCriterio.controls.bienesElaborados.valueChanges.subscribe(
      (x) => {
        if (this.inTipoFormulario == 'fomentoIndustriaAutomotriz') {
          if (x) {
            this.criterioSeleccionado = 'bienesElaborados';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriterio.controls.porcentajeMinimo.setValue(false);
            this.formularioCriterio.controls.procesoProductivo.setValue(false);
          } else {
            this.criterioSeleccionado = 'nobienesElaborados';
            this.oncriterio.emit(this.criterioSeleccionado);
          }
        }
        this.formsupdateValueAndValidity();
      }
    );

    this.formularioCriterio.controls.porcentajeMinimo.valueChanges.subscribe(
      (x) => {
        if (this.inTipoFormulario == 'fomentoIndustriaAutomotriz') {
          if (x) {
            this.criterioSeleccionado = 'porcentajeMinimo';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriteriovalueChanges();
            this.formularioCriterio.controls.bienesElaborados.setValue(false);
            this.formularioCriterio.controls.procesoProductivo.setValue(false);
          }
          else {
            this.criterioSeleccionado = 'procesoProductivo';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriteriovalueChanges();
          }
        }
        this.formsupdateValueAndValidity();
      }
    );

    this.formularioCriterio.controls.procesoProductivo.valueChanges.subscribe(
      (x) => {
        if (this.inTipoFormulario == 'fomentoIndustriaAutomotriz') {
          if (x) {
            this.criterioSeleccionado = 'procesoProductivo';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriteriovalueChanges();
            this.formularioCriterio.controls.bienesElaborados.setValue(false);
            this.formularioCriterio.controls.porcentajeMinimo.setValue(false);
          } else {
            this.criterioSeleccionado = 'noprocesoProductivo';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriteriovalueChanges();
          }
        }
        this.formsupdateValueAndValidity();
      }
    );

    this.formularioCriterio.controls.bienesElaborados.valueChanges.subscribe(
      (x) => {
        if (this.inTipoFormulario == 'regimenTransformacionEnsamblePlanillas') {
          if (x) {
            this.criterioSeleccionado = 'bienesElaborados';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.activeNacional();
            this.formularioCriterio.controls.porcentajeMinimo.setValue(false);
            this.formularioCriterio.controls.procesoProductivo.setValue(false);
            this.resetFormularioInsumo();
          } else {
            this.criterioSeleccionado = 'nobienesElaborados';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.resetNacional();
          }
        }
        this.formsupdateValueAndValidity();
      }
    );

    this.formularioCriterio.controls.porcentajeMinimo.valueChanges.subscribe(
      (x) => {
        if (this.inTipoFormulario == 'regimenTransformacionEnsamblePlanillas') {
          if (x) {
            this.criterioSeleccionado = 'porcentajeMinimo';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriteriovalueChanges();
            this.formularioCriterio.controls.bienesElaborados.setValue(false);
            this.formularioCriterio.controls.procesoProductivo.setValue(false);
          }
          else {
            this.criterioSeleccionado = 'procesoProductivo';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriteriovalueChanges();
          }
        }
        this.formsupdateValueAndValidity();
      }
    );

    this.formularioCriterio.controls.procesoProductivo.valueChanges.subscribe(
      (x) => {
        if (this.inTipoFormulario == 'regimenTransformacionEnsamblePlanillas') {
          if (x) {
            this.criterioSeleccionado = 'procesoProductivo';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriteriovalueChanges();
            this.formularioCriterio.controls.bienesElaborados.setValue(false);
            this.formularioCriterio.controls.porcentajeMinimo.setValue(false);
          } else {
            this.criterioSeleccionado = 'noprocesoProductivo';
            this.oncriterio.emit(this.criterioSeleccionado);
            this.formularioCriteriovalueChanges();
          }
        }
        this.formsupdateValueAndValidity();
      }
    );
  }

  updateFormulario(tipo: string): void {
    this.noMostrarInsumoDecreto1122();

    switch (tipo) {
      case 'produccionNacional':
        this.mostrarFormulario = true;
        this.inactivoIconBienes = true;
        this.inactivoPorcentajeMinimo = true;
        this.inactivoBienesElaborados = true;
        this.inactivoProcesoProductivo = true;
        this.formularioCriterio?.controls.bienesTotal.enable();
        this.formularioCriterio?.controls.bienesTotal.setValue(false);
        this.formularioCriterio?.controls.porcentajeMinimo.enable();
        this.formularioCriterio?.controls.porcentajeMinimo.setValue(false);
        this.formularioCriterio?.controls.bienesElaborados.enable();
        this.formularioCriterio?.controls.bienesElaborados.setValue(false);
        this.formularioCriterio?.controls.procesoProductivo.enable();
        this.formularioCriterio?.controls.procesoProductivo.setValue(false);
        this.formularioCriterio.controls.bienesTotal.enable();
        this.formularioCriterio.controls.bienesTotal.setValue(false);
        this.resetFormularioCriterio();
        this.resetFormularioInsumo();
        this.formularioCriterio.updateValueAndValidity();

        break;
      case 'fomentoIndustriaAutomotriz':
        this.mostrarFormulario = true;
        this.inactivoIconBienes = false;
        this.inactivoPorcentajeMinimo = true;
        this.inactivoBienesElaborados = true;
        this.inactivoProcesoProductivo = true;
        this.formularioCriterio?.controls.porcentajeMinimo.enable();
        this.formularioCriterio?.controls.porcentajeMinimo.setValue(false);
        this.formularioCriterio?.controls.bienesElaborados.enable();
        this.formularioCriterio?.controls.bienesElaborados.setValue(false);
        this.formularioCriterio?.controls.procesoProductivo.enable();
        this.formularioCriterio?.controls.procesoProductivo.setValue(false);
        this.mostrarDecreto1122 = true;
        this.resetBienesTotal();
        this.resetFormularioCriterio();
        this.resetFormularioInsumo();
        this.formularioCriterio.updateValueAndValidity();

        break;

      case 'regimenTransformacionEnsamblePlanillas':
        this.mostrarFormulario = true;
        this.inactivoIconBienes = false;
        this.inactivoPorcentajeMinimo = true;
        this.inactivoBienesElaborados = true;
        this.inactivoProcesoProductivo = true;
        this.formularioCriterio?.controls.porcentajeMinimo.enable();
        this.formularioCriterio?.controls.porcentajeMinimo.setValue(false);
        this.formularioCriterio?.controls.bienesElaborados.enable();
        this.formularioCriterio?.controls.bienesElaborados.setValue(false);
        this.formularioCriterio?.controls.procesoProductivo.enable();
        this.formularioCriterio?.controls.procesoProductivo.setValue(false);
        this.mostrarInsumo = true;
        this.mostrarDecreto1122 = true;
        this.resetBienesTotal();
        this.resetFormularioCriterio();
        this.resetFormularioInsumo();
        this.formularioCriterio.updateValueAndValidity();

        break;

      default:
        this.resetFormularioCriterio();
        this.resetFormularioInsumo();
        this.disableAll();
        this.formularioCriterio?.updateValueAndValidity();

        break;
    }
  }

  noMostrarInsumoDecreto1122(): void {
    this.mostrarInsumo = false;
    this.mostrarDecreto1122 = false;
  }

  disableAll(): void {
    this.inactivoIconBienes = false;
    this.inactivoPorcentajeMinimo = false;
    this.inactivoBienesElaborados = false;
    this.inactivoProcesoProductivo = false;
    this.formularioCriterio?.controls.bienesTotal.disable();
    this.formularioCriterio?.controls.bienesTotal.setValue(false);
    this.formularioCriterio?.controls.porcentajeMinimo.disable();
    this.formularioCriterio?.controls.porcentajeMinimo.setValue(false);
    this.formularioCriterio?.controls.bienesElaborados.disable();
    this.formularioCriterio?.controls.bienesElaborados.setValue(false);
    this.formularioCriterio?.controls.procesoProductivo.disable();
    this.formularioCriterio?.controls.procesoProductivo.setValue(false);
  }

  resetBienesTotal(): void {
    this.formularioCriterio.controls.bienesTotal.disable();
    this.formularioCriterio.controls.bienesTotal.setValue(false);
  }

  resetFormularioCriterio(): void {
    this.formularioCriterio?.controls.bienesElaborados.setValue(false);
    this.formularioCriterio?.controls.porcentajeMinimo.setValue(false);
    this.formularioCriterio?.controls.procesoProductivo.setValue(false);
  }

  resetFormularioInsumo(): void {
    this.formularioInsumo?.controls.importado.disable();
    this.formularioInsumo?.controls.piezaInsumo.disable();
    this.formularioInsumo?.controls.importado.setValue(false);
    this.formularioInsumo?.controls.piezaInsumo.setValue(false);
  }

  activeNacional(): void {
    this.formularioInsumo.controls.nacional.enable();
    this.formularioInsumo.controls.nacional.setValue(true);
  }

  resetNacional(): void {
    this.formularioInsumo.controls.nacional.disable();
    this.formularioInsumo.controls.nacional.setValue(false);
  }

  formularioCriteriovalueChanges(): void {
    this.formularioInsumo.controls.importado.enable();
    this.formularioInsumo.controls.piezaInsumo.enable();
    this.formularioInsumo.controls.importado.setValue(false);
    this.formularioInsumo.controls.piezaInsumo.setValue(false);
  }

  formsupdateValueAndValidity(): void {
    this.formularioCriterio.updateValueAndValidity();
    this.formularioInsumo.updateValueAndValidity();
  }
}
