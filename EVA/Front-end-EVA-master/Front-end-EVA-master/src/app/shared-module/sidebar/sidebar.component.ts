import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { School } from 'src/app/models/school.model';
import { DTOStudent } from 'src/app/models/student.model';
import { SchoolService } from 'src/app/services/school.service';
import { StudentService } from 'src/app/services/student.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public img: string = '';
  public name: string = '';
  public tipo_usuario: string | null= '';
  public school : School = {
    _id: {
      $oid: ''
    },
    nombre: '',
    ubicacion: '',
    convenio: [],
    test: true,
    actividad_extracurricular: []
  }

  public student: DTOStudent = {
    nombre: '',
    apellido: '',
    curso: '',
    grado: ''
  }

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private schoolService: SchoolService,
    private studentService: StudentService

  ) { }

  ngOnInit(): void {
    this.tipo_usuario = this.tokenService.getTipoUsuario();
    if(this.tokenService.getTipoUsuario()==='institucion'){
      this.img = 'https://i.ibb.co/GWHMwVz/esculea-150.jpg'
      this.schoolService.getSchoolById(this.tokenService.getIdSchool())
      .subscribe( data => {
        this.school = data
        this.name = this.school.nombre;
      })
    }else if (this.tokenService.getTipoUsuario()==='estudiante'){
      this.img = 'https://i.ibb.co/Nmy6sPB/estudiante-150.jpg'
      this.studentService.getStudentById(this.tokenService.getIdStudent())
      .subscribe(data => {
        this.student = data
        this.name = this.student.nombre;
      })
    }else {
      this.img = 'https://i.ibb.co/SNgYNtT/admin-150.jpg'
      this.name = 'Adminstrador'
    }
  }

  profile(){
    if(this.tokenService.getTipoUsuario()==='institucion'){
      this.router.navigate(['/profile/read-school/'+this.tokenService.getIdSchool()])
    }else if (this.tokenService.getTipoUsuario()==='estudiante'){
      this.router.navigate(['/profile/read/'])
    }else {
    }
  }

  home(){
    if(this.tokenService.getTipoUsuario()==='institucion'){
      this.router.navigate(['/dashboard'])
    }else if (this.tokenService.getTipoUsuario()==='estudiante'){
      this.router.navigate(['/profile/home/'])
    }else {
      this.router.navigate(['/school'])
    }
  }

  goActivity(){
    if(this.tokenService.getTipoUsuario()==='institucion'){
      this.router.navigate(['/eactivity'])
    }else if (this.tokenService.getTipoUsuario()==='estudiante'){
      this.router.navigate(['/eactivity'])
    }else {
      this.router.navigate(['/admin/activities'])
    }
  }

  goAggre(){
    if(this.tokenService.getTipoUsuario()==='institucion'){
      this.router.navigate(['/aggrement'])
    }else if (this.tokenService.getTipoUsuario()==='estudiante'){
      this.router.navigate(['/aggrement'])
    }else {
      this.router.navigate(['/admin/aggre'])
    }
  }

  goStudent(){
    if(this.tokenService.getTipoUsuario()==='institucion'){
      this.router.navigate(['/student'])
    }else {
      this.router.navigate(['/admin/students'])
    }
  }


}
