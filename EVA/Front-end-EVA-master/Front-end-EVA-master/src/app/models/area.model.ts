import {Subarea} from "./subarea.model";

export interface Area {
  _id: {
    $oid: string
   };
  nombre_area: string;
  descripcion_area: string;
  sub_areas?: Subarea[]
}

export interface areaDTO {
  value:number;
  name:string;
 }

