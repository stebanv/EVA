import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DTOCreateSchool, DTOSchool } from 'src/app/models/school.model';
import { Users } from 'src/app/models/user.model';
import { SchoolService } from 'src/app/services/school.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.css']
})
export class CreateSchoolComponent implements OnInit {

  public formCreate= new FormGroup({});
  private school: DTOCreateSchool = {
    nombre: '',
    ubicacion: '',
    password: '',
    username: ''
  }

  private username: Users[] = []
  private usernameExist: boolean = false;

  public password: string = '';
  constructor(
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.formCreate= this.formBuilder.group({
      nombre: ['', Validators.required],
      ubicacion: ['', [Validators.required]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
    this.userService.getUserName()
    .subscribe(data => {
      this.username = data;
      console.log(this.username)
    })
  }

  onSubmit(){
    this.school= this.formCreate.value
    for (let user of this.username){
      if(user.username === this.school.username){
        this.usernameExist = true;
        console.log(user)
      }
    }
    if(this.usernameExist === false){
      if(this.password === this.school.password){
        this.schoolService.createSchool(this.school)
       .subscribe(data =>{
          console.log(data);
          alert('Institución Educativa creada con éxito')
          this.location.back();
      });
      }else alert('Las contraseñas no coinciden')
    }else alert('El nombre de usuario ' + this.school.username + ' ya existe, intenta con otro')
  }

  back(){
    this.location.back();
  }

}
