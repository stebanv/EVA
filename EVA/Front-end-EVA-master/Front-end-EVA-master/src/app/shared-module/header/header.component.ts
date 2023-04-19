import { ThisReceiver } from '@angular/compiler';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { School } from 'src/app/models/school.model';
import { Student } from 'src/app/models/student.model';
import { SchoolService } from 'src/app/services/school.service';
import { StudentService } from 'src/app/services/student.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public img: string = '';
  public name: string = '';
  public student: Student = {
    _id : {
      $oid: ''
    },
    nombre: '',
    apellido: '',
    grado: '',
    curso: ''
  };
  public school: School = {
    _id: {
      $oid: ''
    },
    nombre: '',
    ubicacion: '',
    test: true
  }
  public tipo_usuario: string | null = '';

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private studentService: StudentService,
    private schoolService: SchoolService
  ) { }

  ngOnInit(): void {
    this.tipo_usuario = this.tokenService.getTipoUsuario();
    if(this.tokenService.getTipoUsuario()==='institucion'){
      this.img = 'https://i.ibb.co/GWHMwVz/esculea-150.jpg';
      this.schoolService.getSchoolById(this.tokenService.getIdSchool())
      .subscribe( data => {
        this.school = data;
        this.name = this.school.nombre;
      })
    }else if (this.tokenService.getTipoUsuario()==='estudiante'){
      this.img = 'https://i.ibb.co/Nmy6sPB/estudiante-150.jpg'
      this.studentService.getStudentById(this.tokenService.getIdStudent())
      .subscribe( data => {
        this.student = data;
        this.name = this.student.nombre
      })
    }else {
      this.img = 'https://i.ibb.co/SNgYNtT/admin-150.jpg'
    }
  }

  logOut(){
    this.tokenService.logOut();
    this.router.navigate(['/inicio'])
  }

  profile(){
    if(this.tokenService.getTipoUsuario()==='institucion'){
      this.router.navigate(['/profile/read-school/'+this.tokenService.getIdSchool()])
    }else if (this.tokenService.getTipoUsuario()==='estudiante'){
      this.router.navigate(['/profile/read/'])
    }else {
    }
  }

}
