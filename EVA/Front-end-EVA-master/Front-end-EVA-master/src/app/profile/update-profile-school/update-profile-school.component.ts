import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Area } from 'src/app/models/area.model';
import { School } from 'src/app/models/school.model';
import { AreaService } from 'src/app/services/area.service';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-update-profile-school',
  templateUrl: './update-profile-school.component.html',
  styleUrls: ['./update-profile-school.component.css']
})
export class UpdateProfileSchoolComponent implements OnInit {

  public formUpdate= new FormGroup({});
  private id: string | null = "";

  dropdownListAdecuacion = [{
    item_id: 0,
    item_text: ''
  }];
  selectedItemsAdecuacion=[{
    item_text: ''
  }];
  dropdownSettingsAdecuacion:IDropdownSettings={};

  dropdownListRecursosA = [{
    item_id: 0,
    item_text: ''
  }];
  selectedItemsRecursosA=[{
    item_text: ''
  }];
  dropdownSettingsRecursosA:IDropdownSettings={};

  dropdownListEspacios = [{
    item_id: 0,
    item_text: ''
  }];
  selectedItemsEspacios=[{
    item_text: ''
  }];
  dropdownSettingsEspacios:IDropdownSettings={};

  dropdownListRecursosE = [{
    item_id: 0,
    item_text: ''
  }];
  selectedItemsRecursosE=[{
    item_text: ''
  }];
  dropdownSettingsRecursosE:IDropdownSettings={};

  private form = {
      notificaciones: '',
      area: '',
      recursos_area: '',
      resultados: '',
      nombre_sede: '',
      ubicacion_sede: '',
      transporte: '',
      clima: '',
      humedad: '',
      ruido: '',
      limite: '',
      reglas: '',
      adecuacion: '',
      recursos_adecuacion: '',
      tipo_espacio: '',
      recursos_estructura: '',
  }

  public school: School = {
      _id:{
        $oid: ''
      },
      nombre: '',
      ubicacion: '',
      test: true,
      actividad_extracurricular :[],
      convenio: [],
      perfil_institucion : {
        preferencias: {
          notificaciones : '',
          area_del_conocimiento: {
            area: '',
            recursos: ''
          },
          forma_presentar_resultados: ''
        },
      },
      contexto_institucion :{
        reglamentacion: {
          limites: '',
          limite_actividades: ''
        },
        tecnologico: {
          adecuacion: [{
            item_id : 0,
            item_text: ''
          }],
          recursos: [{
            item_id : 0,
            item_text: ''
          }]
        },
        estructura : {
          tipo_espacios: [{
            item_id : 0,
            item_text: ''
          }],
          recursos: [{
            item_id : 0,
            item_text: ''
          }]
        }
      }
  }

  private DTOSchool = {
    preferencias: {
      notificaciones : '',
      area_del_conocimiento: {
        area: '',
        recursos: ''
      },
      forma_presentar_resultados: ''
    },
    espacial: {
      sedes_colegio :{
        nombre_sede: '',
        ubicacion: ''
      },
    },
    ambiental: {
      transporte: '',
      clima: '',
      humedad: '',
      ruido: '',
    },
    reglamentacion: {
      limites: '',
      limite_actividades: ''
    },
    tecnologico: {
      adecuacion: '',
      recursos: ''
    },
    estructura : {
      tipo_espacios: '',
      recursos: ''
     }
  }

  enabledTest = true;

  public areas: Area[] = [{
    nombre_area: '',
    descripcion_area: '',
    _id: {
      $oid: ''
    }
  }];

  constructor(
    private schoolService: SchoolService,
    private location: Location,
    private _activeRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private areasService: AreaService,
  ) { }

  ngOnInit(): void {
    this.dropdownListAdecuacion = [
      { item_id: 1, item_text: 'Sala audiovisual' },
      { item_id: 2, item_text: 'Sala de tecnología e informática' },
    ];

    this.dropdownSettingsAdecuacion = {
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: "Seleccionar todos los elementos de la lista",
      unSelectAllText: "Deseleccionar todos los elementos de la lista"
    };
    this.selectedItemsAdecuacion = [
    ];

    this.dropdownListRecursosA = [
      { item_id: 1, item_text: 'Computadores de escritorio' },
      { item_id: 2, item_text: 'Computadores pórtatiles' },
      { item_id: 3, item_text: 'Tablets' },
      { item_id: 4, item_text: 'Dispositivos de entrada' },
      { item_id: 5, item_text: 'Dispositivos de salida' }
    ];

    this.dropdownSettingsRecursosA = {
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: "Seleccionar todos los elementos de la lista",
      unSelectAllText: "Deseleccionar todos los elementos de la lista"
    };
    this.selectedItemsRecursosA = [
    ];

    this.dropdownListEspacios = [
      { item_id: 1, item_text: 'Cancha de fútbol' },
      { item_id: 2, item_text: 'Cancha de béisbol' },
      { item_id: 3, item_text: 'Cancha de vóleibol' },
      { item_id: 4, item_text: 'Sala de artes' },
      { item_id: 5, item_text: 'Laboratorio de física' },
      { item_id: 6, item_text: 'Laboratorio de química' },
      { item_id: 7, item_text: 'Salas de estudio' },
      { item_id: 8, item_text: 'Biblioteca' },
      { item_id: 9, item_text: 'Gimnasio' },
      { item_id: 10, item_text: 'Teatro' }
    ];

    this.dropdownSettingsEspacios = {
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: "Seleccionar todos los elementos de la lista",
      unSelectAllText: "Deseleccionar todos los elementos de la lista"
    };
    this.selectedItemsEspacios = [
    ];

    this.dropdownListRecursosE = [
      { item_id: 1, item_text: 'Instrumentos de laboratorio' },
      { item_id: 2, item_text: 'Implementos deportivo' },
      { item_id: 3, item_text: 'Implementos artísticos' },
      { item_id: 4, item_text: 'Herramientas para el cuidado ambiental y animal' },
    ];

    this.dropdownSettingsRecursosE = {
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: "Seleccionar todos los elementos de la lista",
      unSelectAllText: "Deseleccionar todos los elementos de la lista"
    };
    this.selectedItemsRecursosE = [
    ];

    this.formUpdate= this.formBuilder.group({
      notificaciones: ['',[Validators.required]],
      area: ['', [Validators.required]],
      recursos_area: ['', [Validators.required]],
      resultados: ['', [Validators.required]],
      limite: ['', [Validators.required]],
      reglas: ['', [Validators.required]],
      adecuacion: ['', [Validators.required]],
      recursos_adecuacion: ['', [Validators.required]],
      tipo_espacio: ['', [Validators.required]],
      recursos_estructura: ['', [Validators.required]],
    })
    this.areasService.getAreas()
    .subscribe(data => {
      this.areas = data;
    })
    this.loadForm();
  }

  onSubmit(){
    this.form = this.formUpdate.value;
    console.log(this.DTOSchool);
    if (this.enabledTest != this.school.test){
      this.schoolService.updateStateTest(this.id)
      .subscribe(data => {
        console.log(data)
      })
    }
    this.DTOSchool.preferencias.notificaciones = this.form.notificaciones;
    this.DTOSchool.preferencias.area_del_conocimiento.area = this.form.area;
    this.DTOSchool.preferencias.area_del_conocimiento.recursos = this.form.recursos_area;
    this.DTOSchool.preferencias.forma_presentar_resultados = this.form.resultados;
    this.DTOSchool.reglamentacion.limite_actividades = this.form.limite;
    this.DTOSchool.reglamentacion.limites = this.form.reglas;
    this.DTOSchool.tecnologico.adecuacion = this.form.adecuacion;
    this.DTOSchool.tecnologico.recursos = this.form.recursos_adecuacion;
    this.DTOSchool.estructura.recursos = this.form.recursos_estructura;
    this.DTOSchool.estructura.tipo_espacios = this.form.tipo_espacio;
    this.schoolService.updateProfileSchool(this.school._id.$oid, this.DTOSchool)
    .subscribe(data => {
      console.log(data)
      alert('Perfil actualizado')
      this.location.back()
    })
  }

  loadForm(){
    if(this._activeRouter.snapshot.paramMap.get('id') != null){
      this.id = this._activeRouter.snapshot.paramMap.get('id')
      this.schoolService.getSchoolById(this.id)
      .subscribe(data =>{
        this.school = data;
        console.log(data)
        this.enabledTest = this.school.test;
        this.formUpdate.patchValue({
          notificaciones: this.school.perfil_institucion?.preferencias.notificaciones,
          area: this.school.perfil_institucion?.preferencias.area_del_conocimiento.area,
          recursos_area: this.school.perfil_institucion?.preferencias.area_del_conocimiento.recursos,
          resultados: this.school.perfil_institucion?.preferencias.forma_presentar_resultados,
          limite: this.school.contexto_institucion?.reglamentacion.limite_actividades,
          reglas: this.school.contexto_institucion?.reglamentacion.limites,
          adecuacion: this.school.contexto_institucion?.tecnologico.adecuacion,
          recursos_adecuacion: this.school.contexto_institucion?.tecnologico.recursos ,
          tipo_espacio: this.school.contexto_institucion?.estructura.tipo_espacios,
          recursos_estructura: this.school.contexto_institucion?.estructura.recursos ,
        })
      })
    }
  }

  onBack(){
    this.location.back();
  }
}

