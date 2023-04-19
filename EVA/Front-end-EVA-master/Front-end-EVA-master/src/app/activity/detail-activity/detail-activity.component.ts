import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-detail-activity',
  templateUrl: './detail-activity.component.html',
  styleUrls: ['./detail-activity.component.css']
})
export class DetailActivityComponent implements OnInit {

  public activity : Activity = {
    _id: {
      $oid : ''
    },
    nombre: '',
    descripcion: '',
    horario: '',
    area: '',
    subarea: '',
    cupos: 0,
    recursos: ''
  }

  private id: string| null = ''

  constructor(
    private location: Location,
    private activityService: ActivityService,
    private _activeRouter: ActivatedRoute
    ) { }

  ngOnInit(): void {
    if(this._activeRouter.snapshot.paramMap.get('id') != null){
      this.id=this._activeRouter.snapshot.paramMap.get('id')
      this.activityService.getActivityById(this.id)
      .subscribe( data => {
        console.log(data)
        this.activity = data;
      })
    }
  }

  back(){
    this.location.back();
  }

}
