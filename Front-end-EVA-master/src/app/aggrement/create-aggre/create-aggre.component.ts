import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DTOCreateAggrenment } from 'src/app/models/aggrement.model';
import { Area } from 'src/app/models/area.model';
import { AggrementService } from 'src/app/services/aggrement.service';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-create-aggre',
  templateUrl: './create-aggre.component.html',
  styleUrls: ['./create-aggre.component.css']
})
export class CreateAggreComponent implements OnInit {

  public formCreate= new FormGroup({});

  public areas: Area[] = [];

  public choseArea: Area = {
    _id: {
      $oid: ''
     },
    descripcion_area: '',
    nombre_area: ''
  };

  public season = ['Verano', 'Invierno', 'Primavera','Otoño'];
  public frequency = ['Al menos una vez a la semana', '2 veces a la semana', 'Más de 3 veces a la semana'];
  public schedule = ['Diurno', 'Nocturno', 'Mixto'];

  private dto : DTOCreateAggrenment = {
      nombre: '',
      descripcion : '',
      horario  : '',
      ubicacion  : '',
      area: '',
      subarea : '',
      costo  : 0,
      recursos : '',
      frecuencia  : '',
      temporada  : '',
  }

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private aggreService: AggrementService,
    private areaService: AreaService
  ) { }

  ngOnInit(): void {
    this.formCreate= this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required]],
      horario: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      area: ['', [Validators.required]],
      subarea: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      recursos: ['', [Validators.required]],
      frecuencia: ['', [Validators.required]],
      temporada: ['', [Validators.required]],
      //imagen: ['',],
    });
    this.areaService.getAreas()
    .subscribe (data => {
      this.areas = data;
      console.log(this.areas)
      console.log()
    })
  }

  onSubmit(): any {
    this.dto = this.formCreate.value;
    console.log(this.dto)
    this.aggreService.createAggrement(this.dto)
    .subscribe(data => {
      console.log(data)
      alert('Convenio agregado correctamente')
      window.location.reload();
    });
  }

  subarea(dato: any){
    const name = dato.target.value;
    for (let area of this.areas){
      if(area.nombre_area === name){
        this.choseArea.nombre_area= area.nombre_area;
        this.choseArea.sub_areas = area.sub_areas;
        this.choseArea.descripcion_area = this.choseArea.descripcion_area;
      }
    }
  }

  back(){
    this.location.back();
  }
}
