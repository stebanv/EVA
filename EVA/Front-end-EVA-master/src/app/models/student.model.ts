import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import {Area} from './area.model';
import {School} from './school.model';

export interface profileUserStudent{
  datos_basicos: {
    genero: string,
    diversidad: {
      tipo: string,
      temporalidad: string
    }
  },
  preferencia: {
    notificaciones :{
      tema: string,
      horario: string
    },
    horario_de_actividades: {
      jornada: string,
      dias: string
    }
  },
  intereses: {
    area_del_concimiento: string,
    intereses: {
      tipo_de_espacio: string,
      modo_de_trabajo: string,
      tipo_de_metodologia: string,
      objeto_de_trabajo : string
    },
  }
    personalidad: {
      actitud: string,
      informacion: string,
      toma_de_decisiones: string,
      estilo_de_vida: string,
      perfil_vocacional: string
    }
}

export interface profileContextStudent{
  temporal: {
    jornada: string
  },
  social: {
    presupuesto: string
  }
  reglamentacion: {
    disciplina: string,
    limite: {
      limite: string,
      causa: string
    }
  },
  tecnologico: {
    alfabetizacion: string
  }

}

export interface Student {
  _id:{
    $oid: string
  },
  autorizacion?: boolean,
  curso: string,
  grado: string,
  nombre: string,
  apellido: string,
  perfil_estudiante?: profileUserStudent,
  contexto_estudiante?: profileContextStudent
  institucion?: {
    $oid: string
  }
  area_conocimiento?: [{
    nombre_sub_area: string,
    descripcion_sub_area: string
  }
  ]
}

export interface DTOStudent {
  grado: string,
  nombre: string,
  apellido: string,
  curso: string,
  password?: string,
  username?: string,
}
