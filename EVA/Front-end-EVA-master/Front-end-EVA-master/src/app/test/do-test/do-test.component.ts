import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {TestService} from "../../services/test.service";
import {Answer} from "../../models/test.model";
import {SchoolService} from 'src/app/services/school.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-do-test',
  templateUrl: './do-test.component.html',
  styleUrls: ['./do-test.component.css']
})
export class DoTestComponent implements OnInit {
  public questionList: any = [];
  public currentQuestion: number = 0;
  public nombre_criterio: string = "";
  public nombre_criterio2: string = "";
  public porcentaje_criterio: number = 0;
  public porcentaje_criterio2: number = 0;
  public porcentajeProm_criterio1: number = 0;
  public porcentajeProm_criterio2: number = 0;
  public topic: string = "";
  progress: string = "0";
  promedio: number = 0;
  isQuizCompleted: boolean = false;
  mapResultados: Map<string, number> = new Map;
  mapPromResultados: Map<string, number> = new Map;
  public contador: number = 0;
  public sumatoria: number = 0;
  private results: Answer = {
    respuestas:  [{
      nombre_criterio: '',
      puntaje_criterio: 0
    }]
  };
  private copiaResults: Answer = {
    respuestas:  [{
      nombre_criterio: '',
      puntaje_criterio: 0
    }]};
  private resultadoFinal: Answer = {
    respuestas:  [{
      nombre_criterio: '',
      puntaje_criterio: 0
    }]
  };
  public tipo_usuario : string | null = '';

  isEnabled = true;

  constructor(
    private testService: TestService,
    private schoolService: SchoolService,
    private tokenService: TokenService
  ) {
  }


  ngOnInit(): void {
    this.getAllQuestions();
    this.schoolService.getStateTest(this.tokenService.getIdSchool())
      .subscribe(data => {
        this.isEnabled = data
      })
    this.tipo_usuario = this.tokenService.getTipoUsuario()
  }


  getAllQuestions() {
    this.testService.getAllQuestionsBD()
      .subscribe(res => {
        console.log(res)
        this.questionList = res;
      });


  }

  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQuestion: number, option: any, nombre_criterio1: string, nombre_criterio2: string,nombre_criterio3: string ,nombre_criterio4: string,
         nombre_criterio5: string,nombre_criterio6: string,porcentaje_criterio1: number, porcentaje_criterio2: number, porcentaje_criterio3: number, porcentaje_criterio4: number, porcentaje_criterio5: number, porcentaje_criterio6: number) {

          // token()

    if(this.tipo_usuario === 'estudiante'){
      if (currentQuestion === this.questionList.length) {
        this.isQuizCompleted = true;
        this.testService.sendResults(this.copiaResults)
          .subscribe( data => {
            console.log(data)
          })
      }
      if (currentQuestion < 35) {
        this.results.respuestas.push({nombre_criterio:nombre_criterio1,puntaje_criterio:porcentaje_criterio1})
        this.results.respuestas.push({nombre_criterio:nombre_criterio2,puntaje_criterio:porcentaje_criterio2})
        this.copiaResults = this.results;
      }

      if (currentQuestion>= 36) {
        this.results.respuestas.push({nombre_criterio:nombre_criterio1,puntaje_criterio:porcentaje_criterio1})
        this.results.respuestas.push({nombre_criterio:nombre_criterio2,puntaje_criterio:porcentaje_criterio2})
        this.results.respuestas.push({nombre_criterio:nombre_criterio3,puntaje_criterio:porcentaje_criterio3})
        this.results.respuestas.push({nombre_criterio:nombre_criterio4,puntaje_criterio:porcentaje_criterio4})

      }
      if(currentQuestion >=45) {
        this.results.respuestas.push({nombre_criterio:nombre_criterio1,puntaje_criterio:porcentaje_criterio1})
        this.results.respuestas.push({nombre_criterio:nombre_criterio2,puntaje_criterio:porcentaje_criterio2})
        this.results.respuestas.push({nombre_criterio:nombre_criterio3,puntaje_criterio:porcentaje_criterio3})
        this.results.respuestas.push({nombre_criterio:nombre_criterio4,puntaje_criterio:porcentaje_criterio4})
        this.results.respuestas.push({nombre_criterio:nombre_criterio5,puntaje_criterio:porcentaje_criterio5})
        this.results.respuestas.push({nombre_criterio:nombre_criterio6,puntaje_criterio:porcentaje_criterio6})
      }

      console.log(this.copiaResults)
      setTimeout(() => {
        this.currentQuestion++;
        this.getProgress();
      }, 1000)
    }
  }


  getProgress() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }

}
