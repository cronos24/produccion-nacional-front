import { IPaginacion } from './paginacion.interface';

export interface IRespuesta<T> {
    data: T[];
    paginacion: IPaginacion;
}
