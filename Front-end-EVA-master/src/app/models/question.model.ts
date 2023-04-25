import {Category} from './category.model';
import {Criterion} from "./criterion.model";

export interface Question {
  id: {
    $oid: string
  };
  pregunta: string;
  categoria?:Category;
  criterio1: Criterion;
  criterio2: Criterion;
  opciones: Option[] ;
}


export interface Option {
  _id: {
    $oid: string
  };
  opcion: string;
  criterio1: Criterion;
  criterio2: Criterion;

}
