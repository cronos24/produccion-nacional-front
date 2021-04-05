export interface IMatExtranjerosNal {
  id?: number;
  nombreTecnico?: string;
  subpartida?: string;
  paisProcedencia?: string;
  paisOrigen?: string;
  undMedida?: string;
  cantidad?: string;
  valorCif?: number;
  valorPlanta?: number;
  verbo: 'PUT' | 'DELETE' | 'POST';
}
