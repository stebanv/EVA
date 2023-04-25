import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Activity } from 'src/app/models/activity.model';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import { ActivityService } from 'src/app/services/activity.service';
import { Location } from '@angular/common';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-read-activity',
  templateUrl: './read-activity.component.html',
  styleUrls: ['./read-activity.component.css']
})
export class ReadActivityComponent implements OnInit {

  public page: number =0;
  modalSwitch: boolean = false;

  public tipo_usuario : string | null= '';
  public word: string = "";

  public activities: Activity[] = [
  ]
  public allActivities: Activity[] = [
  ]

  constructor(
    private location: Location,
    private activityService: ActivityService,
    private tokenService: TokenService

  ) { }

  ngOnInit(): void {
    this.tipo_usuario = this.tokenService.getTipoUsuario();
    this.activityService.getAllActivity()
    .subscribe( data => {
      this.allActivities = data;
      this.activities = this.allActivities;
      console.log(this.activities)
    })
  }

  search(){
    this.activities = this.allActivities.filter(activity => activity.nombre.toLowerCase().includes(this.word.toLowerCase()));
  }

  delete(id: string){
    var r = confirm("¿Seguro que desea eliminar esta actividad extracurricular?");
    if (r == true) {
        this.activityService.deleteActivity(id)
        .subscribe(data => {
          console.log(data)
          alert("Actividad Extracurricular eliminada")
          window.location.reload();
        })

        //llamar al http
    }
  }

}
