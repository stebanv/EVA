import {Area} from './area.model';
import {Aggrement} from './aggrement.model';
import {Activity} from './activity.model';

export interface profileUserSchool{
  preferencias:  {
    notificaciones: string;
    area_del_conocimiento : {
      area: string;
      recursos: string;
    };
    forma_presentar_resultados: string;
  }
}

export interface profileContextSchool{

  reglamentacion: {
    limites: string,
    limite_actividades: string
  },
  tecnologico: {
    adecuacion:[{
      item_id : number,
      item_text: string
    }],
    recursos:[{
      item_id : number,
      item_text: string
    }]
  },
  estructura: {
    tipo_espacios: [{
      item_id : number,
      item_text: string
    }],
    recursos:[{
      item_id : number,
      item_text: string
    }]
  }
}

export interface School {
  _id:{
    $oid: string
  }
  actividad_extracurricular?: Activity[];
  convenio?: Aggrement[];
  nombre: string;
  ubicacion: string;
  perfil_institucion?: profileUserSchool;
  contexto_institucion?: profileContextSchool;
  test: boolean
}


export interface DTOSchool{
  nombre: string;
  ubicacion: string;
}

export interface DTOCreateSchool{
  nombre: string;
  ubicacion: string;
  username: string;
  password: string;
}
