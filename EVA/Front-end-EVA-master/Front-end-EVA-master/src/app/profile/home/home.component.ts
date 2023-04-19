import { FocusTrapManager } from '@angular/cdk/a11y/focus-trap/focus-trap-manager';
import { Component, OnInit } from '@angular/core';
import { RecoActivity } from 'src/app/models/activity.model';
import { RecoAggrenment } from 'src/app/models/aggrement.model';
import { ActivityService } from 'src/app/services/activity.service';
import { AggrementService } from 'src/app/services/aggrement.service';
import { StudentService } from 'src/app/services/student.service';
import { TokenService } from 'src/app/services/token.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public page: number =0;

  public criterios: {
    actitud: string,
    estilo_de_vida: string,
    informacion: string,
    perfil_vocacional: string,
    toma_de_decisiones: string,
    modo_de_trabajo: string,
    objeto_de_trabajo: string,
    tipo_de_espacio: string,
    tipo_de_metodologia: string
  } ={
    actitud: '',
    estilo_de_vida: '',
    informacion: '',
    perfil_vocacional: '',
    toma_de_decisiones: '',
    modo_de_trabajo: '',
    objeto_de_trabajo: '',
    tipo_de_espacio: '',
    tipo_de_metodologia: ''
  };
  public student: any;

  public areas : string [] = [];

  public auth : boolean = true;

  public recomendation: {
    actividades_extracurriculares : RecoActivity[],
    convenios: RecoAggrenment[]
  } = {
    actividades_extracurriculares: [],
    convenios: []
  }

  public legthActivity: number = 0;
  public legthAggrement: number = 0;


  constructor(
    private tokenService: TokenService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {

    this.studentService.getStudentById(this.tokenService.getIdStudent())
    .subscribe( data => {
      console.log(data)
      this.student = data;
      this.auth = this.student.autorizacion;
      this.info();
    })
    this.studentService.getRecomendation()
    .subscribe( data => {

      this.recomendation = data;
      console.log(this.recomendation)
    })

  }

  info(){
    this.criterios.actitud =this.student.perfil_estudiante.personalidad.Actitud;
    this.criterios.estilo_de_vida =this.student.perfil_estudiante.personalidad.estilo_de_vida;
    this.criterios.informacion =this.student.perfil_estudiante.personalidad.informacion;
    this.criterios.perfil_vocacional =this.student.perfil_estudiante.personalidad.perfil_vocacional;
    this.criterios.toma_de_decisiones =this.student.perfil_estudiante.personalidad.toma_de_decisiones;
    this.criterios.modo_de_trabajo =this.student.perfil_estudiante.interes.modo_de_trabajo;
    this.criterios.objeto_de_trabajo =this.student.perfil_estudiante.interes.objeto_de_trabajo;
    this.criterios.tipo_de_espacio =this.student.perfil_estudiante.interes.tipo_de_espacio;
    this.criterios.tipo_de_metodologia =this.student.perfil_estudiante.interes.tipo_de_metodologia;
    console.log(this.criterios)
    this.auth = this.student.autorizacion;

    for(let area of this.student.area_conocimiento){
      this.areas.push(area.nombre_sub_area);
    }
  }

}
