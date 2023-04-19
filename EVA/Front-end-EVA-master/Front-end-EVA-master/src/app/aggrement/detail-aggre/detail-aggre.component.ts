import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { AggrementService } from 'src/app/services/aggrement.service';
import { ActivatedRoute } from '@angular/router';
import { Aggrement } from 'src/app/models/aggrement.model';

@Component({
  selector: 'app-detail-aggre',
  templateUrl: './detail-aggre.component.html',
  styleUrls: ['./detail-aggre.component.css']
})
export class DetailAggreComponent implements OnInit {

  private id: string | null = '';
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

  constructor(private location: Location,
    private aggreService: AggrementService,
    private _activeRouter: ActivatedRoute) {

     }

  ngOnInit(): void {
    if(this._activeRouter.snapshot.paramMap.get('id') != null){
      this.id = this._activeRouter.snapshot.paramMap.get('id');
      this.aggreService.getAggrementById(this.id)
      .subscribe (data => {
        this.aggre = data;
        console.log(this.aggre)
      })

    }
  }

  back(){
    this.location.back();
  }

}
