import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from 'src/app/services/activity.service';
import { Activity, DTOActivity } from 'src/app/models/activity.model';
import { AreaService } from 'src/app/services/area.service';
import { Area } from 'src/app/models/area.model';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.css']
})
export class UpdateActivityComponent implements OnInit {

  public formUpdate= new FormGroup({});

  public areas: Area[] = [];

  public choseArea: Area = {
    _id: {
      $oid: ''
     },
    descripcion_area: '',
    nombre_area: ''
  };

  public schedule = ['Diurno', 'Nocturno', 'Mixto'];

  private id: string | null = '';

  public activity : DTOActivity = {
    nombre: '',
    descripcion: '',
    horario: '',
    area: '',
    subarea: '',
    cupos: 0,
    recursos: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private _activeRouter: ActivatedRoute,
    private activityService: ActivityService,
    private areaService: AreaService
  ) { }

  ngOnInit(): void {
    this.formUpdate= this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required]],
      horario: ['', [Validators.required]],
      area: ['', [Validators.required]],
      subarea: ['', [Validators.required]],
      cupos: ['', [Validators.required]],
      recursos: ['', [Validators.required]],
      // images: ['', [Validators.required]],
    });

    if(this._activeRouter.snapshot.paramMap.get('id') != null){
        this.id = this._activeRouter.snapshot.paramMap.get('id')
        this.activityService.getActivityById(this.id)
        .subscribe(data =>{
            this.activity = data;
            console.log(data);
            this.formUpdate.patchValue(data);
            this.areaService.getAreas()
            .subscribe (data => {
            this.areas = data;
            console.log(this.areas)
            })
        })
    }
//precargar los datos
    //this.loadForm();

  }

  onSubmit(): any {
    this.activity = this.formUpdate.value
    this.activityService.updateActivity(this.id, this.activity)
    .subscribe(data => {
      console.log(data)
      alert('Actividad Extracurricular Actualizada');
      this.location.back();
    })
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
