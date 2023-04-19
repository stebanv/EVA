import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { School } from 'src/app/models/school.model';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-read-profile-school',
  templateUrl: './read-profile-school.component.html',
  styleUrls: ['./read-profile-school.component.css']
})
export class ReadProfileSchoolComponent implements OnInit {

  public idS: string | null = '';

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

  constructor(
    private location: Location,
    private schoolService: SchoolService,
    private _activeRouter: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    if(this._activeRouter.snapshot.paramMap.get('id') != null){
      this.idS = this._activeRouter.snapshot.paramMap.get('id')
        this.schoolService.getSchoolById(this.idS)
        .subscribe(data => {
          this.school = data;
          console.log(this.school)
        })
      }
  }

  onBack(){
    this.location.back()
  }


}
