import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-read-profile',
  templateUrl: './read-profile.component.html',
  styleUrls: ['./read-profile.component.css']
})
export class ReadProfileComponent implements OnInit {

  private idS: string | null = '';
  public student: Student = {
    _id:{
      $oid: ''
    },
    nombre: '',
    apellido: '',
    curso: '',
    grado: '',
    perfil_estudiante : {
      datos_basicos:{
        genero :'',
        diversidad: {
          tipo: '',
          temporalidad: ''
        }
      },
      preferencia: {
        notificaciones :{
          tema: '',
          horario: ''
        },
      horario_de_actividades: {
          jornada: '',
          dias: ''
        }
      },
      intereses:{
        area_del_concimiento: '',
        intereses: {
          tipo_de_espacio: '',
          modo_de_trabajo: '',
          tipo_de_metodologia: '',
          objeto_de_trabajo : ''
        }},
      personalidad: {
        actitud: '',
        informacion: '',
        toma_de_decisiones: '',
        estilo_de_vida: '',
         perfil_vocacional: ''
      }
    },
    contexto_estudiante :{
      temporal: {
        jornada: ''
      },
      social: {
        presupuesto: ''
      },
      reglamentacion: {
        disciplina: '',
        limite: {
          limite: '',
          causa: ''
        }
      },
      tecnologico: {
        alfabetizacion: ''
      }
    }
  }

  constructor(
    private studentService: StudentService,
    private location: Location,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getIdStudent()){
      this.idS = this.tokenService.getIdStudent();
    }
    this.studentService.getStudentById(this.idS)
    .subscribe( data => {
      this.student = data;
      console.log(this.student)
    });

  }

  back(){
    this.location.back();
  }

}
