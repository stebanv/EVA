import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, ChartOptions} from 'chart.js';
import { Activity } from 'src/app/models/activity.model';
import { areaDTO } from 'src/app/models/area.model';
import { CriterioDTO } from 'src/app/models/criterion.model';
import { ActivityService } from 'src/app/services/activity.service';
import { SchoolService } from 'src/app/services/school.service';
import { ControlSidebarComponent } from 'src/app/shared-module/control-sidebar/control-sidebar.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  public descripcion: string[] = []

  private colors: string [] = [
    '#d6d52b',
    '#ffd468',
    '#89ab32',
    '#1a6f9e',
    '#0a5c1a',
    '#084476'
  ]

  public areasValues: {
    deportes: number,
    artes: number,
    sociales: number,
    logica:number,
    tecnologia: number,
    naturales: number,
  } = {
    deportes: 0,
    artes: 0,
    sociales: 0,
    logica: 0,
    tecnologia: 0,
    naturales: 0,
  };

  public areaSelected: string ='';
  public criterioSelected: string='';
  public subareasSelected: areaDTO[]= [];
  public criteriosSelected: CriterioDTO[]= []
  public criteriosSelectedPar: CriterioDTO[]= []

  public barChartOptionsSubareas: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max:10
      },
    },
  };
  public barChartTypeSubareas: ChartType = 'bar';
  public barChartDataSubareas: ChartData<'bar'> = {
    labels: [ ],
    datasets: [
      { data: [], label: 'Subárea', backgroundColor: '#89ab32' }
    ],
  };

  public barChartOptionsAreas: ChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
  }};
  public barChartTypeAreas: ChartType = 'pie';
  public barChartDataAreas: ChartData<'pie'> = {
    labels: [ ],
    datasets: [
    ],
  };

  public barChartOptionsCriterios: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
}};
public barChartTypeCriterios: ChartType = 'bar';
public barChartDataCriterios: ChartData<'bar'> = {
  labels: [ ],
  datasets: [
  ],
};

  public barChartOptionsActivity: ChartOptions = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max:10
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
  }};
  public barChartTypeActivity: ChartType = 'bar';
  public barChartDataActivity: ChartData<'bar'> = {
    labels: [ ],
    datasets: [
    ],
  };

  constructor(
    private schoolService: SchoolService,
    private activityService: ActivityService
  ) { }

  ngOnInit(): void {
    this.viewAreas();
    this.viewSubareas();
    this.viewAllSubareas();
    this.viewCriterios();
  }

  public selectArea(){

  }

  public viewAreas(){
    let total: number = 0;
    this.schoolService.analisisAreas()
    .subscribe((data) => {
      //console.log(data)
      for (let key of Object.keys(data)){
        total = data['Numero estudiantes']
        if(key === 'Artes' && total!==0){
          this.areasValues.artes = Math.round((data[key]/total)*100||0);
        } else if(key === 'Deportes' && total!==0){
          this.areasValues.deportes = Math.round((data[key]/total)*100||0);
        } else if (key === 'Ciencias Sociales' && total!==0){
          this.areasValues.sociales = Math.round((data[key]/total)*100||0);
        } else if (key === 'Lógica Matemática' && total!==0){
          this.areasValues.logica = Math.round((data[key]/total)*100||0);
        } else if (key === 'Tecnología' && total!==0){
          this.areasValues.tecnologia = Math.round((data[key]/total)*100||0);
        } else if(key === 'Ciencias Naturales' && total!==0){
          this.areasValues.naturales = Math.round((data[key]/total)*100||0)
        }
      }
    })
  }

  public viewSubareas(){
    let subareas:[{nombre: string, value: number}]= [{nombre: '', value: 0}];
    this.schoolService.analisisSubareas()
    .subscribe(data => {
      for (let key of Object.keys(data)){
        subareas.push({nombre: key, value: data[key]});
      }
     // console.log(subareas)
      //console.log(subareas.sort((a,b) => (a.value < b.value) ? 1 : -1))
    if(subareas.length > 0){
      this.barChartDataSubareas = {
        labels: [ subareas[0+1].nombre,  subareas[0+2].nombre,  subareas[0+3].nombre,  subareas[0+4].nombre,  subareas[0+5].nombre ],
        datasets: [
          { data: [ subareas[0+1].value, subareas[0+2].value, subareas[0+3].value, subareas[0+4].value, subareas[0+5].value ],
            label: 'Subáreas', backgroundColor: '#89ab32' }
        ],};
      }
    })
  }

  public updateSubareas(){
    this.viewSubareas();
  }

  public viewAllSubareas(){
    let subareas:areaDTO[] = [];
    let valores: number[] = [];
    let nombres: string[] = [];
    this.schoolService.analisisSubareas()
    .subscribe(data => {
      for (let key of Object.keys(data)){
        subareas.push({name: key, value: data[key]});
      }
      if(this.areaSelected === 'Deportes'){
        this.subareasSelected = subareas.filter(subarea => subarea.name === 'Deportes de pelota' || subarea.name=== 'Deportes de combate' || subarea.name=== 'Deportes atléticos');
      } else if (this.areaSelected === 'Artes'){
        this.subareasSelected = subareas.filter(subarea => subarea.name === 'Artes plásticas' || subarea.name=== 'Danza' || subarea.name=== 'Música-Canto' || subarea.name=== 'Música-Instrumental' || subarea.name=== 'Teatro');
      } else if (this.areaSelected === 'Ciencias-naturales'){
        this.subareasSelected = subareas.filter(subarea => subarea.name === 'Cuidado ambiental' || subarea.name=== 'Cuidado animal' || subarea.name=== 'Experimentación y laboratorio');
      } else if (this.areaSelected === 'Ciencias-sociales'){
        this.subareasSelected = subareas.filter(subarea => subarea.name === 'Lengua castellana e idiomas extranjeros' || subarea.name=== 'Obra social' || subarea.name=== 'Política y democracia');
      } else if (this.areaSelected === 'Logica-matematica'){
        this.subareasSelected = subareas.filter(subarea => subarea.name === 'Lógica' || subarea.name=== 'Estadística' || subarea.name=== 'Contabilidad');
      } else if (this.areaSelected === 'Tecnologia'){
        this.subareasSelected = subareas.filter(subarea => subarea.name === 'Uso de herramientas ofimáticas' || subarea.name=== 'Producción multimedia' || subarea.name=== 'Emprendimiento con base tecnológico' || subarea.name=== 'Uso de herramientas de desarrollo');
      }

      for (let subarea of this.subareasSelected){
        nombres.push(subarea.name);
        valores.push(subarea.value);
      }
      this.barChartDataAreas = {
        labels: nombres,
        datasets: [
          { data: valores,
            label: 'Subáreas', backgroundColor: [  '#d6d52b',
            '#ffd468',
            '#89ab32',
            '#1a6f9e',
            '#0a5c1a',
            '#084476']}
        ],};
        this.activityByArea(this.areaSelected);
    });
  }

  public activityByArea(area: string){
    let activities : Activity[] = [];
    this.activityService.getAllActivity()
    .subscribe( data => {
      console.log(data)
      if(area==='Deportes'){
        activities = data.filter(activity => activity.area === 'Deportes');
      } else if (area==='Artes'){
        activities = data.filter(activity => activity.area === 'Artes');
      } else if (area === 'Ciencias-naturales'){
        activities = data.filter(activity => activity.area === 'Ciencias naturales');
      } else if (area === 'Ciencias-sociales'){
        activities = data.filter(activity => activity.area === 'Ciencias sociales y humanidades');
      } else if (area === 'Logica-matematica'){
        activities = data.filter(activity => activity.area === 'Lógica y matemática');
      } else if (area === 'Tecnologia'){
        activities = data.filter(activity => activity.area === 'Tecnología');
      }
      let subarea : {
        deportes_combate: number,
        deportes_pelota: number,
        deportes_atleticos:number,
        musica_canto: number,
        musica_instrumental: number,
        teatro: number,
        danza: number,
        artes_plasticas: number,
        cuidado_ambiental: number,
        cuidado_animal: number,
        experimentacion_laboratorio: number,
        lengua_castellana_idiomas_extranjeros: number,
        obra_social: number,
        politica_democracia: number,
        logica: number,
        estadistica: number,
        contabilidad: number,
        uso_herramientas_ofimaticas: number,
        produccion_multimedia: number,
        uso_herramientas_desarrollo: number,
        emprendimiento_base_tecnologico: number
      }= {
        deportes_combate: 0,
        deportes_pelota: 0,
        deportes_atleticos:0,
        musica_canto: 0,
        musica_instrumental: 0,
        teatro: 0,
        danza: 0,
        artes_plasticas: 0,
        cuidado_ambiental: 0,
        cuidado_animal: 0,
        experimentacion_laboratorio: 0,
        lengua_castellana_idiomas_extranjeros: 0,
        obra_social: 0,
        politica_democracia: 0,
        logica: 0,
        estadistica: 0,
        contabilidad: 0,
        uso_herramientas_ofimaticas: 0,
        produccion_multimedia: 0,
        uso_herramientas_desarrollo: 0,
        emprendimiento_base_tecnologico: 0
      };
      console.log(activities)
      for (let activity of activities){
        if(activity.subarea === 'Deportes de pelota'){
          subarea.deportes_pelota++;
        } else if(activity.subarea === 'Deportes de combate'){
          subarea.deportes_combate++;
        } else if (activity.subarea === 'Deportes atléticos'){
          subarea.deportes_atleticos++;
        } else if (activity.subarea === 'Música-Canto'){
          subarea.musica_canto++;
        } else if (activity.subarea === 'Música-Instrumental'){
          subarea.musica_instrumental++;
        } else if (activity.subarea === 'Teatro'){
          subarea.teatro++;
        } else if (activity.subarea === 'Danza'){
          subarea.danza++;
        } else if (activity.subarea === 'Artes plásticas'){
          subarea.artes_plasticas++;
        } else if (activity.subarea === 'Cuidado ambiental'){
          subarea.cuidado_ambiental++;
        } else if (activity.subarea === 'Cuidado animal'){
          subarea.cuidado_animal++;
        } else if (activity.subarea === 'Experimentación en laboratorio'){
          subarea.experimentacion_laboratorio++;
        } else if (activity.subarea === 'Lengua castellana y idiomas extranjeros'){
          subarea.lengua_castellana_idiomas_extranjeros++;
        } else if (activity.subarea === 'Obra social'){
          subarea.obra_social++;
        } else if (activity.subarea === 'Política y democracia'){
          subarea.politica_democracia++;
        } else if (activity.subarea === 'Lógica'){
          subarea.logica++;
        } else if (activity.subarea === 'Estadística'){
          subarea.estadistica++;
        } else if (activity.subarea === 'Contabilidad'){
          subarea.contabilidad++;
        } else if (activity.subarea === 'Uso de herramientas ofimáticas'){
          subarea.uso_herramientas_ofimaticas++;
        } else if (activity.subarea === 'Producción multimedia'){
          subarea.produccion_multimedia++;
        } else if (activity.subarea === 'Uso de herramientas de desarrollo'){
          subarea.uso_herramientas_desarrollo++;
        } else if (activity.subarea === 'Emprendimiento base tecnológico'){
          subarea.emprendimiento_base_tecnologico++;
        }
      }
      console.log(subarea)

      if(area==='Deportes'){
        this.barChartDataActivity = {
          labels: [ 'Deportes de combate', 'Deportes de pelota', 'Deportes atléticos'],
          datasets: [
            { data: [ subarea.deportes_combate, subarea.deportes_pelota, subarea.deportes_atleticos],
              label: 'Subáreas', backgroundColor: '#89ab32' }
          ],};
          this.descripcion = [];
          if(subarea.deportes_combate===0){this.descripcion.push('Deportes de combate');}
          if(subarea.deportes_pelota===0){this.descripcion.push('Deportes de pelota');}
          if(subarea.deportes_atleticos===0){this.descripcion.push('Deportes atléticos');}
      } else if (area==='Artes'){
        this.barChartDataActivity = {
          labels: [ 'Danza', 'Teatro', 'Artes plásticas', 'Música Instrumental', 'Música Canto'],
          datasets: [
            { data: [ subarea.danza, subarea.teatro, subarea.artes_plasticas, subarea.musica_instrumental, subarea.musica_canto],
              label: 'Subáreas', backgroundColor: '#89ab32' }
          ],};
          this.descripcion = [];
          if(subarea.danza===0){this.descripcion.push('Danza');}
          if(subarea.teatro===0){this.descripcion.push('Teatro');}
          if(subarea.artes_plasticas===0){this.descripcion.push('Artes plásticas');}
          if(subarea.musica_instrumental===0){this.descripcion.push('Música Instrumental');}
          if(subarea.musica_canto===0){this.descripcion.push('Música Canto');}
      } else if (area === 'Ciencias-naturales'){
        this.barChartDataActivity = {
          labels: [ 'Cuidado ambiental', 'Cuidado animal', 'Experimentación y laboratorio'],
          datasets: [
            { data: [ subarea.cuidado_ambiental, subarea.cuidado_animal, subarea.experimentacion_laboratorio],
              label: 'Subáreas', backgroundColor: '#89ab32' }
          ],};
          this.descripcion = [];
          if(subarea.cuidado_ambiental===0){this.descripcion.push('Cuidado ambiental');}
          if(subarea.cuidado_animal===0){this.descripcion.push('Cuidado animal');}
          if(subarea.experimentacion_laboratorio===0){this.descripcion.push('Experimentación y laboratorio');}
      } else if (area === 'Ciencias-sociales'){
        this.barChartDataActivity = {
          labels: [ 'Obra social', 'Política y democracia', 'Lengua castellana y idiomas extranjeros'],
          datasets: [
            { data: [ subarea.obra_social, subarea.politica_democracia, subarea.lengua_castellana_idiomas_extranjeros],
              label: 'Subáreas', backgroundColor: '#89ab32' }
          ],};
          this.descripcion = [];
          if(subarea.obra_social===0){this.descripcion.push('Obra social');}
          if(subarea.politica_democracia===0){this.descripcion.push('Política y democracia');}
          if(subarea.lengua_castellana_idiomas_extranjeros===0){this.descripcion.push('Lengua castellana y idiomas extranjeros');}
      } else if (area === 'Logica-matematica'){
        this.barChartDataActivity = {
          labels: [ 'Lógica', 'Estadística', 'Contabilidad'],
          datasets: [
            { data: [ subarea.logica, subarea.estadistica, subarea.contabilidad],
              label: 'Subáreas', backgroundColor: '#89ab32' }
          ],};
          this.descripcion = [];
          if(subarea.logica===0){this.descripcion.push('Lógica');}
          if(subarea.estadistica===0){this.descripcion.push('Estadística');}
          if(subarea.contabilidad===0){this.descripcion.push('Contabilidad');}
      } else if (area === 'Tecnologia'){
        this.barChartDataActivity = {
          labels: [ 'Uso de herramientas ofimáticas', 'Producción multimedia', 'Uso de herramientas de desarrollo', 'Emprendimiento base tecnológico'],
          datasets: [
            { data: [ subarea.uso_herramientas_ofimaticas, subarea.produccion_multimedia, subarea.uso_herramientas_desarrollo, subarea.emprendimiento_base_tecnologico],
              label: 'Subáreas', backgroundColor: '#89ab32' }
          ],};
          this.descripcion = [];
          if(subarea.uso_herramientas_ofimaticas===0){this.descripcion.push('Uso de herramientas ofimáticas');}
          if(subarea.produccion_multimedia===0){this.descripcion.push('Producción multimedia');}
          if(subarea.uso_herramientas_desarrollo===0){this.descripcion.push('Uso de herramientas de desarrollo');}
          if(subarea.emprendimiento_base_tecnologico===0){this.descripcion.push('Emprendimiento base tecnológico');}
      }
    });
  }

  public updateAllSubareas(){
    this.viewAllSubareas();
  }

  public viewCriterios(){
    let criterios: CriterioDTO[] = []
    let valores: number[] = [];
    let nombres: string[] = [];
    let valoresPar: number[]=[];
    let nombresPar: string[]=[];
    this.schoolService.analisisCriterios()
    .subscribe(data =>{
      //console.log(data)
      for (let key of Object.keys(data)){
        criterios.push({nombre: key, valor: data[key]});
        //console.log(criterios)
      }
      if(this.criterioSelected === 'Personalidad'){
        this.criteriosSelected=[];
        this.criteriosSelectedPar=[];
        this.criteriosSelected = criterios.filter(criterio => criterio.nombre === 'Introvertido' || criterio.nombre === 'Intuitivo' || criterio.nombre === 'Racional' || criterio.nombre === 'Calificador');
        this.criteriosSelectedPar = criterios.filter(criterio => criterio.nombre === 'Extrovertido' || criterio.nombre === 'Sensorial' || criterio.nombre === 'Emocional' || criterio.nombre === 'Perceptivo');
      } else if (this.criterioSelected === 'Intereses'){
        this.criteriosSelected=[];
        this.criteriosSelectedPar=[];
        this.criteriosSelected = criterios.filter(criterio => criterio.nombre === 'Aire libre' || criterio.nombre === 'Trabajo en equipo' || criterio.nombre === 'Teorico' );
        this.criteriosSelectedPar = criterios.filter(criterio => criterio.nombre === 'Espacio cerrado' || criterio.nombre ==='Individual' || criterio.nombre === 'Practico');
        console.log(this.criteriosSelectedPar)
      } else if (this.criterioSelected === 'Delimitante-personalidad'){
        this.criteriosSelected=[];
        this.criteriosSelectedPar=[];
        this.criteriosSelected = criterios.filter(criterio => criterio.nombre === 'Social' || criterio.nombre === 'Convencional' || criterio.nombre === 'Emprendedor'|| criterio.nombre === 'Investigador' || criterio.nombre === 'Realista' || criterio.nombre === 'Artista'  );
      } else if (this.criterioSelected === 'Delimitante-intereses'){
        this.criteriosSelected=[];
        this.criteriosSelectedPar=[];
        this.criteriosSelected = criterios.filter(criterio => criterio.nombre === 'Cosas' || criterio.nombre === 'Personas' || criterio.nombre === 'Datos'|| criterio.nombre === 'Ideas');
      }

      //console.log(this.criteriosSelected)
      for (let criterio of this.criteriosSelected){
          console.log(criterio)
          valores.push(criterio.valor);
          nombres.push(criterio.nombre);
      }
      for (let criterioPar of this.criteriosSelectedPar){
            valoresPar.push(criterioPar.valor);
            nombresPar.push(criterioPar.nombre);
      }

      if(this.criterioSelected === 'Personalidad')
      {
      this.barChartDataCriterios = {
        labels: [ 'Introvertido-Extrovertido', 'Intuitivo-Sensorial', 'Racional-Emocional', 'Calificador-Perceptivo'],
        datasets: [
        { data: valores, label: 'Dicotomia 1', backgroundColor: '#d6d52b'},
        { data: valoresPar, label: 'Dicotomia 2', backgroundColor :'#89ab32' }
      ]}
      } else if (this.criterioSelected === 'Intereses'){
        this.barChartDataCriterios = {
          labels: [ 'Aire libre-Espacio cerrado', 'Trabajo en equipo-Individual', 'Teórico-Práctico'],
          datasets: [
          { data: valores, label: 'Dicotomia 1', backgroundColor: '#d6d52b'},
          { data: valoresPar, label: 'Dicotomia 2', backgroundColor :'#89ab32' }
        ]}
      } else if (this.criterioSelected === 'Delimitante-personalidad'){
        this.barChartDataCriterios = {
          labels: [ 'Investigador','Artista', 'Social','Realista', 'Emprendedor','Convencional'],
          datasets: [
          { data: valores, label: 'Delimitantes', backgroundColor: '#d6d52b'},
        ]}
      } else if (this.criterioSelected === 'Delimitante-intereses'){
        this.barChartDataCriterios = {
          labels: [ 'Cosas','Ideas', 'Personas','Datos'],
          datasets: [
          { data: valores, label: 'Delimitantes', backgroundColor: '#d6d52b'},
        ]}
      }
    })
  }

  public updateAllCriterios(){
    this.viewCriterios();
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public download(){
    this.schoolService.downloadResults('resultados-individuales','application/pdf')
    .subscribe(
      data =>{
       // console.log(data)
      }
    )
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartDataSubareas.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    // this.chart?.update();
  }
}
