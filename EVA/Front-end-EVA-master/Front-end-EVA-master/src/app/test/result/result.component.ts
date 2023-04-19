import { Component, OnInit } from '@angular/core';
import { NgbTimepickerI18nDefault } from '@ng-bootstrap/ng-bootstrap/timepicker/timepicker-i18n';
import { Category } from 'src/app/models/category.model';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { TestService } from 'src/app/services/test.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  private categorias: Category[] = [];

  public student: Student = {
    nombre: '',
    apellido: '',
    grado: '',
    curso: '',
    _id:{
      $oid: ''
    },
    autorizacion: true
  }

  public areas: [{nombre_sub_area: string, descripcion_sub_area: string}] = [{
    nombre_sub_area: '',
    descripcion_sub_area: ''
  }]

  public results : [
    {aire_libre: number, categoria: string, espacio_cerrado: number},
    {trabajo_en_equipo: number, categoria: string, trabajo_individual: number},
    {practico: number, categoria: string, teorico:number},
    {cosas: number, categoria: string, datos:number, ideas: number, personas:number},
    {extrovertido: number, categoria: string, introvertido:number},
    {intuitivo: number, categoria: string, sensorial:number},
    {emocional: number, categoria: string, racional:number},
    {calificador: number, categoria: string, perceptivo:number},
    {artista: number, categoria: string, convencional:number, emprendedor: number, investigador: number, realista: number, social:number},
  ] = [
  {aire_libre: 0, categoria: '', espacio_cerrado: 0},
  {trabajo_en_equipo: 0, categoria: '', trabajo_individual: 0},
  {practico: 0, categoria: '', teorico:0},
  {cosas: 0, categoria: '', datos:0, ideas: 0, personas:0},
  {extrovertido: 0, categoria: '', introvertido:0},
  {intuitivo: 0, categoria: '', sensorial:0},
  {emocional: 0, categoria: '', racional:0},
  {calificador: 0, categoria: '', perceptivo:0},
  {artista: 0, categoria: '', convencional:0, emprendedor: 0, investigador: 0, realista: 0, social:0},
]

  public personalidadResult : [{
    categoriaMayor: string,
    descripcion: string,
    valorMenor:string,
    valorMayor:string
  }] = [{
    categoriaMayor: '',
    descripcion: '',
    valorMayor: '',
    valorMenor:''
  }]

  public interesesResult : [{
    categoriaMayor: string,
    descripcion: string,
    valorMenor:string,
    valorMayor:string
  }] = [{
    categoriaMayor: '',
    descripcion: '',
    valorMayor: '',
    valorMenor:''
  }]

  public delIntResult : {
    categoriaMayor: string,
    descripcion: string,
    valorMenor:string,
    valorMayor:string
  } = {
    categoriaMayor: '',
    descripcion: '',
    valorMayor: '',
    valorMenor:'',
  }

  public delPerResult : {
    categoriaMayor: string,
    descripcion: string,
    valorMenor:string,
    valorMayor:string
  } = {
    categoriaMayor: '',
    descripcion: '',
    valorMayor: '',
    valorMenor:'',
  }

  private descripciones: {
    intro: string,
    extro:string,
    senso:string,
    intui:string,
    racio:string,
    emocio:string,
    calif:string,
    percep:string,
    teo:string,
    pra:string,
    libre:string,
    cerrado:string,
    equipo:string,
    indiv:string,
    cosas:string,
    ideas:string,
    personas:string,
    datos:string,
    artis:string,
    conve:string,
    real:string,
    empre:string,
    inve:string,
    social:string
  } = {
    intro: '',
    extro:'',
    senso:'',
    intui:'',
    racio:'',
    emocio:'',
    calif:'',
    percep:'',
    teo:'',
    pra:'',
    libre:'',
    cerrado:'',
    equipo:'',
    indiv:'',
    cosas:'',
    ideas:'',
    personas:'',
    datos:'',
    artis:'',
    conve:'',
    real:'',
    empre:'',
    inve:'',
    social:''
  }

  constructor(
    private testService: TestService,
    private studentService: StudentService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.testService.getCategories()
    .subscribe(data => {
      console.log(data)
      this.categorias= data;
      this.getDescripcion();
      this.interesesResult.splice(0,1);
      this.personalidadResult.splice(0,1)
      this.result();
    })
    this.studentService.getStudentById(this.tokenService.getIdStudent())
    .subscribe(data => {
      console.log(data)
      this.student = data;
    });

  }

  getDescripcion(){
    for(let category of this.categorias){
      for (let criterio of category.criterios){
          if(criterio.nombre_criterio === 'Espacio Cerrado'){
            this.descripciones.cerrado = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Aire libre'){
            this.descripciones.libre = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Individual'){
            this.descripciones.indiv = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Trabajo en equipo'){
            this.descripciones.equipo = criterio.descripcion_criterio;
          }else if(criterio.nombre_criterio === 'Práctco'){
            this.descripciones.pra = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Teorico'){
            this.descripciones.teo = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Introvertido'){
            this.descripciones.intro = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Extrovertido'){
            this.descripciones.extro = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Intuitivo'){
            this.descripciones.intui = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Sensorial'){
            this.descripciones.senso = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Emocional'){
            this.descripciones.emocio = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Racional'){
            this.descripciones.racio = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Calificador'){
            this.descripciones.calif = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Perceptivo'){
            this.descripciones.percep = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Ideas'){
            this.descripciones.ideas = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Objetos'){
            this.descripciones.cosas = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Personas'){
            this.descripciones.personas = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Datos'){
            this.descripciones.datos = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Investigador'){
            this.descripciones.inve = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Social'){
            this.descripciones.social = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Convencioanl'){
            this.descripciones.conve = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Realista'){
            this.descripciones.real = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Artista'){
            this.descripciones.artis = criterio.descripcion_criterio;
          }else if (criterio.nombre_criterio === 'Emprendedor'){
            this.descripciones.empre = criterio.descripcion_criterio;
          }
      }
    }
    console.log(this.descripciones)
  }

  result(){
    this.testService.getResults()
    .subscribe(data => {
      this.results = data;
      console.log(this.results)
       //intereses
    if(this.results[0].aire_libre > this.results[0].espacio_cerrado){
      this.interesesResult.push({categoriaMayor: 'Aire Libre', descripcion: this.descripciones.libre, valorMayor:this.results[0].aire_libre+'%', valorMenor:this.results[0].espacio_cerrado+'%'})
    }else this.interesesResult.push({categoriaMayor: 'Espacio Cerrado', descripcion: this.descripciones.cerrado, valorMayor:this.results[0].espacio_cerrado+'%', valorMenor:this.results[0].aire_libre+'%'})

    if(this.results[1].trabajo_en_equipo > this.results[1].trabajo_individual){
      this.interesesResult.push({categoriaMayor: 'Trabajo en Equipo', descripcion: this.descripciones.equipo, valorMayor:this.results[1].trabajo_en_equipo+'%', valorMenor:this.results[1].trabajo_individual+'%'})
    }else this.interesesResult.push({categoriaMayor: 'Trabajo individual', descripcion: this.descripciones.indiv, valorMayor:this.results[1].trabajo_individual+'%', valorMenor:this.results[1].trabajo_en_equipo+'%'})

    if(this.results[2].practico > this.results[2].teorico){
      this.interesesResult.push({categoriaMayor: 'Práctico', descripcion: this.descripciones.pra, valorMayor:this.results[2].practico+'%', valorMenor:this.results[2].teorico+'%'})
    }else this.interesesResult.push({categoriaMayor: 'Teórico', descripcion: this.descripciones.teo, valorMayor:this.results[2].teorico+'%' , valorMenor:this.results[2].practico+'%'})

     //delimitante intereses
     if(this.results[3].cosas > this.results[3].personas && this.results[3].cosas > this.results[3].ideas && this.results[3].cosas > this.results[3].datos){
      this.delIntResult.categoriaMayor = 'Trabajar con Cosas'
      this.delIntResult.descripcion= this.descripciones.cosas
      this.delIntResult.valorMayor= this.results[3].cosas+'%'
      this.delIntResult.valorMenor= (100-this.results[3].cosas)+'%'
    }else if (this.results[3].datos > this.results[3].cosas && this.results[3].datos > this.results[3].ideas && this.results[3].datos > this.results[3].personas){
      this.delIntResult.categoriaMayor = 'Trabajar con Datos'
      this.delIntResult.descripcion= this.descripciones.datos
      this.delIntResult.valorMayor= this.results[3].datos+'%'
      this.delIntResult.valorMenor= (100-this.results[3].datos)+'%'
    }else if (this.results[3].ideas > this.results[3].cosas && this.results[3].ideas > this.results[3].datos && this.results[3].ideas > this.results[3].personas){
      this.delIntResult.categoriaMayor = 'Trabajar con Ideas'
      this.delIntResult.descripcion= this.descripciones.ideas
      this.delIntResult.valorMayor= this.results[3].ideas+'%'
      this.delIntResult.valorMenor= (100-this.results[3].ideas)+'%'
    }else {
      this.delIntResult.categoriaMayor = 'Trabajar con Personas'
      this.delIntResult.descripcion= this.descripciones.personas
      this.delIntResult.valorMayor= this.results[3].personas+'%'
      this.delIntResult.valorMenor= (100-this.results[3].personas)+'%'
    }
    //personalidad
    if(this.results[4].extrovertido > this.results[4].introvertido){
      this.personalidadResult.push({categoriaMayor: 'Extrovertido', descripcion:this.descripciones.extro, valorMayor:this.results[4].extrovertido+'%', valorMenor:this.results[4].introvertido+'%'})
    }else this.personalidadResult.push({categoriaMayor: 'Introvertido', descripcion:this.descripciones.intro, valorMayor:this.results[4].introvertido+'%', valorMenor:this.results[4].extrovertido+'%'})

    if(this.results[5].intuitivo > this.results[5].sensorial){
      this.personalidadResult.push({categoriaMayor: 'Intuitivo', descripcion:this.descripciones.intui, valorMayor:this.results[5].intuitivo+'%', valorMenor:this.results[5].sensorial+'%'})
    }else this.personalidadResult.push({categoriaMayor: 'Sensorial', descripcion:this.descripciones.senso, valorMayor:this.results[5].sensorial+'%', valorMenor: this.results[5].intuitivo+'%'})

    if(this.results[6].emocional > this.results[6].racional){
      this.personalidadResult.push({categoriaMayor: 'Emocional', descripcion:this.descripciones.emocio, valorMayor:this.results[6].emocional+'%', valorMenor:this.results[6].racional+'%'})
    }else this.personalidadResult.push({categoriaMayor: 'Racional', descripcion:this.descripciones.racio, valorMayor:this.results[6].racional+'%', valorMenor: this.results[6].emocional+'%'})

    if(this.results[7].calificador > this.results[7].perceptivo){
      this.personalidadResult.push({categoriaMayor: 'Calificador', descripcion:this.descripciones.calif, valorMayor:this.results[7].calificador+'%', valorMenor:this.results[7].perceptivo+'%'})
    }else this.personalidadResult.push({categoriaMayor: 'Perceptivo', descripcion:this.descripciones.percep, valorMayor:this.results[7].perceptivo+'%', valorMenor: this.results[7].calificador+'%'})



    //delimitante personalidad
    if(this.results[8].artista > this.results[8].convencional && this.results[8].artista > this.results[8].emprendedor && this.results[8].artista > this.results[8].investigador && this.results[8].artista > this.results[8].realista && this.results[8].artista > this.results[8].social){
      this.delPerResult.categoriaMayor = 'Artista'
      this.delPerResult.descripcion= this.descripciones.artis
      this.delPerResult.valorMayor = this.results[8].artista+'%'
      this.delPerResult.valorMenor= (100-this.results[8].artista)+'%'
    }else if (this.results[8].convencional > this.results[8].artista && this.results[8].convencional > this.results[8].emprendedor && this.results[8].convencional > this.results[8].investigador && this.results[8].convencional > this.results[8].realista && this.results[8].convencional > this.results[8].social) {
      this.delPerResult.categoriaMayor = 'Convencional'
      this.delPerResult.descripcion= this.descripciones.conve
      this.delPerResult.valorMayor = this.results[8].convencional+'%'
      this.delPerResult.valorMenor= (100-this.results[8].convencional)+'%'
    }else if (this.results[8].emprendedor > this.results[8].artista && this.results[8].emprendedor > this.results[8].convencional && this.results[8].emprendedor> this.results[8].investigador && this.results[8].emprendedor > this.results[8].realista && this.results[8].emprendedor > this.results[8].social){
      this.delPerResult.categoriaMayor = 'Emprendedor'
      this.delPerResult.descripcion= this.descripciones.empre
      this.delPerResult.valorMayor = this.results[8].emprendedor+'%'
      this.delPerResult.valorMenor= (100-this.results[8].emprendedor)+'%'
    }else if (this.results[8].investigador > this.results[8].artista && this.results[8].investigador > this.results[8].convencional && this.results[8].investigador> this.results[8].emprendedor && this.results[8].investigador > this.results[8].realista && this.results[8].investigador > this.results[8].social){
      this.delPerResult.categoriaMayor = 'Investigador'
      this.delPerResult.descripcion= this.descripciones.inve
      this.delPerResult.valorMayor = this.results[8].investigador+'%'
      this.delPerResult.valorMenor= (100-this.results[8].investigador)+'%'
    }else if (this.results[8].realista > this.results[8].artista && this.results[8].realista > this.results[8].convencional && this.results[8].realista> this.results[8].emprendedor && this.results[8].realista > this.results[8].investigador && this.results[8].realista > this.results[8].social){
      this.delPerResult.categoriaMayor = 'Realista'
      this.delPerResult.descripcion= this.descripciones.real
      this.delPerResult.valorMayor = this.results[8].realista+'%'
      this.delPerResult.valorMenor= (100-this.results[8].realista+'%')
    } else {
      this.delPerResult.categoriaMayor = 'Social'
      this.delPerResult.descripcion= this.descripciones.social
      this.delPerResult.valorMayor = this.results[8].social+'%'
      this.delPerResult.valorMenor= (100-this.results[8].social)+'%'
    }
    });
   console.log(this.delIntResult)
   console.log(this.delPerResult)
   console.log(this.personalidadResult)
   console.log(this.interesesResult)
  }

  descrip(dep: string){
    // console.log(this.delIntResult.descripcion)
    return dep;
  }

  // area(){
  //   Object.keys(this.student.area_conocimiento).forEach(key => {
  //     let value = this.studentService.[key];
  //   })
  // }


}
