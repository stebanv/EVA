import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DTOStudent } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { Users } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  public formCreate= new FormGroup({});

  public password: string = '';

  private dto: DTOStudent ={
    nombre: '',
    apellido: '',
    curso: '',
    grado: '',
    username: '',
    password: '',
  }

  private username: Users[] = []
  private usernameExist: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private studentService: StudentService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.formCreate= this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      grado: ['', [Validators.required]],
      curso: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password : ['', [Validators.required]]
    });
    this.userService.getUserName()
    .subscribe(data => {
      this.username = data;
      console.log(this.username)
    })
  }

  onSubmit(): any {
    console.log(this.formCreate.value)
    this.dto = this.formCreate.value;
    for (let user of this.username){
      if(user.username === this.dto.username){
        this.usernameExist = true;
        console.log(user)
      }
    }
    if(this.usernameExist === false){
      if(this.password === this.dto.password){
          this.studentService.createStudent(this.dto)
          .subscribe(data => {
             console.log(data)
            alert('Estudiante creado con éxito')
            this.back()
          })
        } else alert('Las contraseñas no coinciden')
    } else alert ('El nombre de usuario ' + this.dto.username + ' ya existe, intenta con otro')
  }

  loadForm(){
    //aqui se carga el form
    //this.form.patchValue() y ponerlo en el onInit
  }

  back(){
    this.location.back();
  }

}
