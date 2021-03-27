export interface ISolicitud {
    productoNombreComercial: string,
    programaId: string,
    estado: number,
    radicado: string,
    auditoria: {
        fechaCreacionFormateada
    }
}
