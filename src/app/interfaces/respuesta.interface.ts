import { IPagina } from './pagina.interface';

export interface IRespuesta<T> {
    codigo: number;
    mensaje: string;
    respuesta: {
        [key: string]: T | IPagina;
    };
}
