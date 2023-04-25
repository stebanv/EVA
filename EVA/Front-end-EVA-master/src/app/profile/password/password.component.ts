import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {


  public formCreate= new FormGroup({});

  private pass = {
    password_actual : '',
    password_nueva: '',
    password: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.formCreate= this.formBuilder.group({
      password_actual: ['', Validators.required],
      password_nueva: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(){
    this.pass = this.formCreate.value
    if(this.pass.password === this.pass.password_nueva){
      this.userService.changePassword({password: this.pass.password_actual, new_password: this.pass.password_nueva})
      .subscribe( data =>{
        alert('Contraseña actualizada con éxito')
        this.location.back()
      },
      (error: HttpErrorResponse) => {
        alert('No se puedo actualizar la contraseña')
      })
    }else alert('Las contraseñas no coinciden')
  }

  back(){
    this.location.back()
  }


}




