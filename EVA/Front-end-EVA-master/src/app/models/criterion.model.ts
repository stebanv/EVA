export interface Criterion {
  _id: {
    $oid: string
  };
  nombre_criterio: string;
  descripcion_criterio: string;

}

export interface CriterioDTO{
  nombre: string,
  valor: number,
}
