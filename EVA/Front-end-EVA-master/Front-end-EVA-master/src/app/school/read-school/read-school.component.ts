import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { School } from 'src/app/models/school.model';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-read-school',
  templateUrl: './read-school.component.html',
  styleUrls: ['./read-school.component.css']
})
export class ReadSchoolComponent implements OnInit {

  public page: number =0;
  modalSwitch: boolean = false;
  public word: string = "";

  public schools: School[] = [];
  public allSchools: School[] = [];

  constructor(
    private schoolService: SchoolService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.schoolService.getAllSchool()
    .subscribe(data =>{
      this.allSchools = data;
      this.schools = this.allSchools;
      console.log(data);
     });
  }

  search(){
    this.schools = this.allSchools.filter(school => school.nombre.toLowerCase().includes(this.word.toLowerCase()));
  }

  delete(id: string){
    var m = confirm("¿Seguro que desea eliminar esta institución?")
    if (m == true) {
        this.schoolService.deleteSchool(id)
        .subscribe(data =>{
          console.log(data)
          alert("Institución educativa eliminada");
        })
    }
    window.location.reload();
  }


}
