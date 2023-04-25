import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-read-student',
  templateUrl: './read-student.component.html',
  styleUrls: ['./read-student.component.css']
})
export class ReadStudentComponent implements OnInit {

  public page: number =0;
  modalSwitch: boolean = false;
  public word: string = "";

  private allstudents: Student[] = [];
  public students: Student[] =[]

  constructor(
    private studentService: StudentService,
  ) { }

  ngOnInit(): void {
    this.studentService.getAllStudentBySchool()
    .subscribe(data =>
      {
        console.log(data);
        this.allstudents = data;
        this.students = this.allstudents;
      })
  }

  search(){
    console.log(this.word);
    this.students = this.allstudents.filter(student => student.nombre.toLowerCase().includes(this.word.toLowerCase()));
  }

  delete(id: string){
    var r = confirm("¿Seguro que desea eliminar este estudiante");
    if (r == true) {
        this.studentService.deleteStudent(id)
        .subscribe(data =>
          {
            console.log(data)
            alert("Estudiante eliminado");
            window.location.reload();

          })

        //llamar al http
    }
  }
}
