import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { SchoolService } from 'src/app/services/school.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-edit-auth',
  templateUrl: './edit-auth.component.html',
  styleUrls: ['./edit-auth.component.css']
})
export class EditAuthComponent implements OnInit {

  public students: Student[] =[]
  public page: number =0;

  public studentEdit: {
    estudiantes: String[]
  } = {
    estudiantes: []
  }

  constructor(
    private studentService: StudentService,
    private schoolService: SchoolService,
  ) { }

  ngOnInit(): void {
    this.studentService.getAllStudentBySchool()
    .subscribe(data =>
      {
        console.log(data);
        this.students = data
      })
  }

  enabled(){
    this.schoolService.enabledAuth(this.studentEdit)
    .subscribe(data =>
      {
        console.log(data);
        window.location.reload();
      })
  }

  disenabled(){
    this.schoolService.disenabledAuth(this.studentEdit)
    .subscribe(data =>
      {
        console.log(data);
        window.location.reload();
      })
  }

  check(id : string){
    this.studentEdit.estudiantes.push(id);
    console.log(this.studentEdit)
  }

}
