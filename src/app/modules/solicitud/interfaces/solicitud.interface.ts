export interface ISolicitud {
    id?: number,
    productoNombreComercial?: string,
    programaId?: string,
    estado?: number,
    radicado?: string,
    anulacionMotivo?: string,
    auditoria?: {
        fechaCreacionFormateada
    }
}
