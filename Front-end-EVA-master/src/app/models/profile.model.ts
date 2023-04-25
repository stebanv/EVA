import {Area} from './area.model';
import {Subarea} from './subarea.model';
export interface Profile {
  id: string;
  title: string;
  images: string;
  area: Area [];
  subarea:Subarea [];
  description: string;
}
