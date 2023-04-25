import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Aggrement, DTOCreateAggrenment } from 'src/app/models/aggrement.model';
import { AggrementService } from 'src/app/services/aggrement.service';
import { Area } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-update-aggre',
  templateUrl: './update-aggre.component.html',
  styleUrls: ['./update-aggre.component.css']
})
export class UpdateAggreComponent implements OnInit {

  public formUpdate= new FormGroup({});

  public aggre : Aggrement = {
    _id:{
      $oid: ''
    },
    nombre: '',
    descripcion: '',
    horario: '',
    ubicacion: '',
    area: '',
    subarea: '',
    costo: 0,
    recursos: '',
    frecuencia: '',
    temporada: '',
  }

  private aggreDto: DTOCreateAggrenment = {
    nombre: '',
    descripcion: '',
    horario: '',
    ubicacion: '',
    area: '',
    subarea: '',
    costo: 0,
    recursos: '',
    frecuencia: '',
    temporada: '',
  }

  public areas: Area[] = [];

  public choseArea: Area = {
    _id: {
      $oid: ''
     },
    descripcion_area: '',
    nombre_area: ''
  };

  private id: string | null = '';

  public season = ['Verano', 'Invierno', 'Primavera','Otoño'];
  public frequency = ['Al menos una vez a la semana', '2 veces a la semana', 'Más de 3 veces a la semana'];
  public schedule = ['Diurno', 'Nocturno', 'Mixto'];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private _activeRouter: ActivatedRoute,
    private aggreService: AggrementService,
    private areaService: AreaService
  ) { }

  ngOnInit(): void {
    this.formUpdate= this.formBuilder.group({
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
      // images: ['', [Validators.required]],
    });

    if(this._activeRouter.snapshot.paramMap.get('id') != null){
      this.id = this._activeRouter.snapshot.paramMap.get('id');
      this.aggreService.getAggrementById(this.id)
      .subscribe (data => {
        this.aggre = data;
        console.log(this.aggre)
        this.loadForm();
        this.areaService.getAreas()
        .subscribe (data => {
          this.areas = data;
          console.log(this.areas)
        })
      })

    }
  }

  onSubmit(): any {
    this.aggreDto = this.formUpdate.value
    this.aggreService.updateAggrement(this.id, this.aggreDto)
    .subscribe( data => {
      console.log(data)
      alert('Convenio Actualizado');
      this.location.back();

    })
  }

  loadForm(){
    this.formUpdate.patchValue(this.aggre);
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
