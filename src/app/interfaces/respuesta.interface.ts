import { IPagina } from './pagina.interface';

export interface IRespuesta<T> {
    codigo: number;
    mensaje: string;
    respuesta: {
        solicitudes: T;
        pagina: IPagina;
    };
}
