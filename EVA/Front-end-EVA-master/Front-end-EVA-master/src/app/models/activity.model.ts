import { ActivityComponent } from '../activity/activity.component';
import {Area} from './area.model';

export interface Activity {

  _id: {
    $oid: string
   };
  nombre: string;
  descripcion: string;
  horario : string;
  area: string;
  subarea: string;
  cupos: number;
  recursos: string;
  // images?: string;
}

export interface DTOActivity extends Omit<Activity, '_id'>{

}

export interface RecoActivity {
  nombre: string;
  descripcion: string;
  horario : string;
  area: string;
  subarea: string;
  cupos: number;
  recursos: string;
  id: string,
}
