import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DTOSchool, School } from 'src/app/models/school.model';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-update-school',
  templateUrl: './update-school.component.html',
  styleUrls: ['./update-school.component.css']
})
export class UpdateSchoolComponent implements OnInit {

  public formUpdate= new FormGroup({});
  private schoolDto: DTOSchool = {
    nombre: '',
    ubicacion: '',
  }

  private school: School ={
    _id: {
      $oid: ''
    },
    nombre: '',
    ubicacion: '',
    convenio: [],
    test: true,
    actividad_extracurricular: []
  }

  private id: string | null = '';

  constructor(
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private location: Location,
    private _activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formUpdate= this.formBuilder.group({
      nombre: ['', Validators.required],
      ubicacion: ['', [Validators.required]],
    });

    if(this._activeRouter.snapshot.paramMap.get('id') != null){
        this.id = this._activeRouter.snapshot.paramMap.get('id');
        this.schoolService.getSchoolById(this.id)
        .subscribe(data => {
        this.school = data
        console.log(this.school);
        this.loadForm()
     });
    }

  }

  onSubmit(){

    this.schoolDto = this.formUpdate.value;
    this.schoolService.updateSchool(this.id, this.schoolDto)
    .subscribe( data => {
      console.log(data)
      alert('Institución Educativa actualizada');
      this.location.back();
    });

  }

  loadForm(){
    this.schoolDto.nombre = this.school.nombre;
    this.schoolDto.ubicacion = this.school.ubicacion;
    console.log(this.schoolDto)
    this.formUpdate.patchValue({
      nombre : this.schoolDto.nombre,
      ubicacion : this.schoolDto.ubicacion
    })
  }

  back(){
    this.location.back();
  }

}
