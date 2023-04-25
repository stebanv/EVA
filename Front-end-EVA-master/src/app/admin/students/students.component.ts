import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/models/school.model';
import { Student } from 'src/app/models/student.model';
import { SchoolService } from 'src/app/services/school.service';
import { StudentService } from 'src/app/services/student.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  public page: number =0;
  modalSwitch: boolean = false;
  public select = false;
  public idSelect: string = '';
  public word: string = "";
  public students: Student[] =[];
  public allstudents: Student[] =[];
  public schools: School[] = [];

  constructor(
    private schoolService: SchoolService,
    private tokenService: TokenService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.schoolService.getAllSchool()
    .subscribe(data => {
      this.schools = data;
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

  selectId(){
    this.select = true;
    this.tokenService.saveIdSchool(this.idSelect);
    console.log(this.tokenService.getIdSchool())
    this.studentService.getAllStudentBySchool()
    .subscribe(data => {
      this.allstudents = data
      this.students = this.allstudents;
      console.log(data)
    })
  }
}
