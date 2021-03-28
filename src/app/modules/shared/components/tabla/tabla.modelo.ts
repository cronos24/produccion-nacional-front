import { TipoProceso } from 'src/app/modelo/TipoProceso';

export interface Columna {
  field?: string;
  titulo?: string;
  pSortableColumn?: string;
  sortField?: string;
  valor?: string | ((fila: any, columna: Columna) => string);
  valorHtml?: string | ((fila: any, columna: Columna) => string);
  ejecutarAccion?: (fila: any, columna: Columna) => void;
  nombreAccion?: string | ((fila: any, columna: Columna) => string);
  claseCss?: string | ((fila: any, columna: Columna) => string);
  expandible?: boolean;
}
export interface PropiedadesTabla {
  dataKey?: string;
  rows?: number;
  globalFilterFields: string[];
  claseCss?: string;
  claseCssContenedor?: string;
}
export interface DefinicionTabla {
  titulo?: string;
  columnas: Columna[];
  propiedadesTabla: PropiedadesTabla;
  mostrarFormaEdicion: (tipoProceso: TipoProceso, fila: any) => void;
  eliminar: (fila: any, e) => void;
  mostrarVer?: (fila: any) => boolean;
  mostrarEliminar?: (fila: any) => boolean;
  ver?: (fila: any, e) => void;
  verHtml?: (fila: any) => string;
  mensajeEliminar?: string;
  calcularLabelEditar?: (fila: any) => string;
}
