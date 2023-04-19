import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { School } from 'src/app/models/school.model';
import { ActivityService } from 'src/app/services/activity.service';
import { SchoolService } from 'src/app/services/school.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  public page: number =0;
  modalSwitch: boolean = false;
  public select = false;
  public idSelect: string = '';
  public word: string = "";
  public activities: Activity[] =[];
  public allActivities: Activity[] = []
  public schools: School[] = [];
  public tipo_usuario: string | null= '';

  constructor(
    private schoolService: SchoolService,
    private tokenService: TokenService,
    private activityService: ActivityService
  ) { }

  ngOnInit(): void {
    this.tipo_usuario = this.tokenService.getTipoUsuario();
    this.schoolService.getAllSchool()
    .subscribe(data => {
      this.schools = data;
    })
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

  selectId(){
    this.select = true;
    this.tokenService.saveIdSchool(this.idSelect);
    console.log(this.tokenService.getIdSchool())
    this.activityService.getAllActivity()
    .subscribe(data => {
      this.allActivities = data;
      this.activities = this.allActivities;
      console.log(data)
    })
  }

  search(){
    this.activities = this.allActivities.filter(activity => activity.nombre.toLowerCase().includes(this.word.toLowerCase()));
  }

}
