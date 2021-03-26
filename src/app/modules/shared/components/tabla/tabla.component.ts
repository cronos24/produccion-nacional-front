import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoProceso } from 'src/app/modelo/TipoProceso';
import { Columna, DefinicionTabla } from './tabla.modelo';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  @Input() public definicionTabla: DefinicionTabla;
  @Input() public datos: any;
  @Input() public cargando = false;
  @Input() public ocultarEliminar = false;
  @Input() public ocultarActualizar = false;
  @Input() public ocultarOpciones = false;
  @Input() public activarSeleccion = false;
  @Input() public mostrarContenedorVer = false;
  @Input() public datosSeleccionados: any[];
  @Output() public datosSeleccionadosChange = new EventEmitter<any[]>();
  public TipoProceso = TipoProceso;
  public RowsPerPageOptions = [1, 2, 5, 10, 20, 30];

  constructor() {}

  public ngOnInit(): void {
    console.log("Carga la tabla ")
  }

  
  public claseContenedor() {
    const clases = ['p-col-12 tablaContenedor'];
    if (this.definicionTabla.propiedadesTabla?.claseCssContenedor) {
      clases.push(this.definicionTabla.propiedadesTabla?.claseCssContenedor);
    }
    return clases.join(' ');
  }

  public claseTabla() {
    const clases = ['p-datatable-customers p-datatable-sm'];
    if (this.definicionTabla.propiedadesTabla?.claseCss) {
      clases.push(this.definicionTabla.propiedadesTabla?.claseCss);
    }
    return clases.join(' ');
  }

  public actualizarSeleccion($event) {
    this.datosSeleccionados = $event;
    this.datosSeleccionadosChange.emit(this.datosSeleccionados);
  }

  public claseColumna(fila: any, columna: Columna) {
    const claseCss = [];
    if (typeof columna.claseCss === 'undefined') {
      claseCss.push('p-text-left');
    }
    if (!!columna.expandible) {
      claseCss.push('expandible');
    }
    if (typeof columna.claseCss === 'function') {
      claseCss.push(columna.claseCss(fila, columna));
    } else {
      claseCss.push(columna.claseCss);
    }
    return claseCss.join(' ');
  }

  public obtenerValor(fila: any, columna: Columna) {
    return typeof columna.valor === 'function'
      ? columna.valor(fila, columna)
      : fila[columna.valor];
  }

  public obtenerValorHtmlT(fila: any, columna: Columna) {
    return typeof columna.valorHtml === 'function'
      ? columna.valorHtml(fila, columna)
      : fila[columna.valorHtml];
  }

  public calcularNombreAccion(fila, columna: Columna) {
    if (typeof columna.nombreAccion === 'function') {
      return columna.nombreAccion(fila, columna);
    }
    return columna.nombreAccion;
  }

  public calcularMostrarFormaEdicion(tipoProceso: TipoProceso, fila: any) {
    if (typeof this.definicionTabla.mostrarFormaEdicion === 'function') {
      this.definicionTabla.mostrarFormaEdicion(tipoProceso, fila);
    }
  }
  public calcularEliminar(fila, e) {
    if (typeof this.definicionTabla.eliminar === 'function') {
      this.definicionTabla.eliminar(fila, e);
    }
  }
  public calcularEjecutarAccion(e, fila, columna: Columna) {
    e.preventDefault();
    if (typeof columna.ejecutarAccion === 'function') {
      columna.ejecutarAccion(fila, columna);
    }
  }
 
  public calcularVer(fila, e) {
    if (typeof this.definicionTabla.ver === 'function') {
      this.definicionTabla.ver(fila, e);
    }
  }
  public mostrarVer(fila) {
    let mostrar = false;
    if (
      typeof this.definicionTabla.ver === 'function' ||
      typeof this.definicionTabla.verHtml === 'function'
    ) {
      mostrar = true;
    }
    if (mostrar && typeof this.definicionTabla.mostrarVer === 'function') {
      mostrar = this.definicionTabla.mostrarVer(fila);
    }

    return mostrar;
  }
  public mostrarEliminar(fila) {
    if (typeof this.definicionTabla.mostrarEliminar === 'function') {
      return this.definicionTabla.mostrarEliminar(fila);
    }

    return true;
  }
  public calcularMensajeEliminar() {
    return !!this.definicionTabla.mensajeEliminar
      ? this.definicionTabla.mensajeEliminar
      : '¿Desea eliminar este registro?';
  }
  public calcularLabelEditar(fila) {
    if (typeof this.definicionTabla.calcularLabelEditar === 'function') {
      return this.definicionTabla.calcularLabelEditar(fila);
    }
    return 'EDITAR';
  }

}