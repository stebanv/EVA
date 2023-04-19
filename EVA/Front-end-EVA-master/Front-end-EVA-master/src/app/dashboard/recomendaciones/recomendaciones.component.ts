import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {

  public page: number =0;
  public subareas : [{nombre: string, recomendacion: string, numero_estudiantes:number}] = [{
    nombre: "Agua",
    recomendacion: "Recomendacion 1",
    numero_estudiantes:1,
  }];
  public subareasfinal: any;
  public numeroTotal: number = 0;

  constructor(
    private schoolService: SchoolService
  ) { }

  ngOnInit(): void {
    let subareas: [{nombre: string, recomendacion: string,  numero_estudiantes:number}]=[{
      nombre:'',
      recomendacion: '',
      numero_estudiantes:1
    }]
    let number: number;
    let areaKey: any;
    this.schoolService.getRecomendaciones()
    .subscribe( data => {
      console.log(data)
      for (let key of Object.keys(data)){
        if(key === 'Numero total estudiantes'){
          this.numeroTotal = data[key];
        }
        areaKey= data[key]
        console.log(areaKey)
        for (let inforec of Object.keys(areaKey)){
          if(inforec === 'Numero Estudiantes'){
            number = areaKey[inforec]
          }
          if(inforec !== 'Numero Estudiantes') {
            subareas.push({
              nombre: inforec,
              recomendacion: areaKey[inforec],
              numero_estudiantes: number
            })
          }
        }
      }
      console.log(subareas)
      this.subareas = subareas;
      this.subareas.splice(0,1)
      //console.log(this.subareas)
    })
  }


}
