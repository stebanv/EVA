import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DTOActivity } from 'src/app/models/activity.model';
import { ActivityService } from 'src/app/services/activity.service';
import { Area } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

  public formCreate= new FormGroup({});

  public areas: Area[] = [];

  public choseArea: Area = {
    _id: {
      $oid: ''
     },
    descripcion_area: '',
    nombre_area: ''
  };

  public schedule = ['Diurno', 'Nocturno', 'Mixto'];

  private dto : DTOActivity = {
    nombre: '',
    descripcion: '',
    recursos: '',
    horario: '',
    cupos: 0,
    area:'',
    subarea: '',
  }

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activityService: ActivityService,
    private areaService: AreaService
  ) { }

  ngOnInit(): void {
    this.formCreate= this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required]],
      horario: ['', [Validators.required]],
      area: ['', [Validators.required]],
      subarea: ['', [Validators.required]],
      cupos: ['', [Validators.required]],
      recursos: ['', [Validators.required]],
      // images: ['', [Validators.required]],
    });
    this.areaService.getAreas()
      .subscribe (data => {
        this.areas = data;
        console.log(this.areas)
      });
//precargar los datos
    //this.loadForm();
  }

  onSubmit(): any {
    this.dto = this.formCreate.value;
    console.log(this.formCreate.value)
    this.activityService.createActivity(this.dto)
    .subscribe( data => {
      console.log(data)
      alert('Actividad extracurricular creada con éxito')
      this.back();
    });
  }

  //forma de cargar datos en el form

  loadForm(): any {
    const response = {
      email: 'jenifer.medina@gmail.com',
      password: '233455',
      terms: 'true'
    };
    this.formCreate.patchValue(response)
  }

  subarea(dato: any){
    const name = dato.target.value;
    for (let area of this.areas){
      if(area.nombre_area === name){
        this.choseArea.nombre_area = area.nombre_area;
        this.choseArea.sub_areas = area.sub_areas;
        this.choseArea._id.$oid = area._id.$oid;
        this.choseArea.descripcion_area = area.descripcion_area;
      }
    }
  }

  back(){
    this.location.back();
  }

}
