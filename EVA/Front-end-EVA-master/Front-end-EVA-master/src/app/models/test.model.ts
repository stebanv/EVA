import {Question} from "./question.model";

export interface Test {
  _id: {
    $oid:string;},
  titulo: string;
  preguntas: Question [];
  disponibilidad: boolean;
}

 export interface Answer{
  respuestas:[{
    nombre_criterio: string,
    puntaje_criterio: number
}]}

