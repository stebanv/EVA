import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  public formUpdate= new FormGroup({});
  private id: string|null = '';

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

  private DTOStudent = {
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
    }},
    espacial: {
      direccion_residencia: '',
    },
    temporal: {
      jornada: ''
    },
    ambiental: {
      medio_de_transporte: ''
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
    },
  }

  private form = {
      genero:'',
      tipo: '',
      temporalidad: '',
      tema: '',
      horario: '',
      jornada: '',
      dias: '',
      direccion_residencia: '',
      jornada_contexto: '',
      medio_de_transporte: '',
      presupuesto:'',
      disciplina: '',
      limite: '',
      causa: '',
      alfabetizacion: '',
  }

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private _activeRouter: ActivatedRoute,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.formUpdate= this.formBuilder.group({
      genero: ['',[Validators.required]],
      tipo: ['', [Validators.required]],
      temporalidad: ['', [Validators.required]],
      tema: ['', [Validators.required]],
      horario: ['', [Validators.required]],
      jornada: ['', [Validators.required]],
      dias: ['', [Validators.required]],
      jornada_contexto: ['', [Validators.required]],
      limite: ['', [Validators.required]],
      causa: ['', [Validators.required]],
      alfabetizacion: ['', [Validators.required]],
      presupuesto: ['', [Validators.required]]
    });
    this.loadForm()
  }

  onSubmit(){
    console.log(this.formUpdate.value)
    this.form = this.formUpdate.value;
    console.log(this.form);
    this.DTOStudent.datos_basicos.genero = this.form.genero;
    this.DTOStudent.datos_basicos.diversidad.tipo = this.form.tipo;
    this.DTOStudent.datos_basicos.diversidad.temporalidad = this.form.temporalidad;
    this.DTOStudent.preferencia.notificaciones.tema = this.form.tema;
    this.DTOStudent.preferencia.notificaciones.horario = this.form.horario;
    this.DTOStudent.preferencia.horario_de_actividades.jornada =  this.form.jornada;
    this.DTOStudent.preferencia.horario_de_actividades.dias = this.form.dias;
    this.DTOStudent.temporal.jornada = this.form.jornada_contexto;
    this.DTOStudent.reglamentacion.limite.limite = this.form.limite;
    this.DTOStudent.reglamentacion.limite.causa = this.form.causa;
    this.DTOStudent.tecnologico.alfabetizacion = this.form.alfabetizacion;
    this.DTOStudent.social.presupuesto = this.form.presupuesto;

    console.log(this.DTOStudent)
    this.studentService.updateProfileStudent(this.id, this.DTOStudent)
    .subscribe(data => {
      console.log(data)
      alert('Perfil actualizado')
      this.location.back()
    })
  }

  loadForm(){
    if(this._activeRouter.snapshot.paramMap.get('id') != null){
      this.id = this._activeRouter.snapshot.paramMap.get('id')
      this.studentService.getStudentById(this.id)
      .subscribe(data => {
        this.student = data;
        console.log(this.student)
        this.formUpdate.patchValue({
          genero: this.student.perfil_estudiante?.datos_basicos.genero,
          tipo: this.student.perfil_estudiante?.datos_basicos.diversidad.tipo,
          temporalidad: this.student.perfil_estudiante?.datos_basicos.diversidad.temporalidad,
          tema: this.student.perfil_estudiante?.preferencia.notificaciones.tema,
          horario: this.student.perfil_estudiante?.preferencia.notificaciones.horario,
          jornada: this.student.perfil_estudiante?.preferencia.horario_de_actividades.jornada,
          dias: this.student.perfil_estudiante?.preferencia.horario_de_actividades.dias,
          jornada_contexto: this.student.contexto_estudiante?.temporal.jornada,
          limite: this.student.contexto_estudiante?.reglamentacion.limite.limite,
          causa: this.student.contexto_estudiante?.reglamentacion.limite.causa,
          alfabetizacion: this.student.contexto_estudiante?.tecnologico.alfabetizacion,
          presupuesto: this.student.contexto_estudiante?.social.presupuesto
        })
      });
    }
  }

  back(){
    this.location.back();
  }

}
