import {Criterion} from "./criterion.model";

export interface Category {
  _id: {
    $oid: string
  };
  tipo: string;
  nombre_categoria: string;
  descripcion_categoria: string;
  criterios: Criterion[]
}
