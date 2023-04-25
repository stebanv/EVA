import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ignoreElements } from 'rxjs';
import { User, UserDTO } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin= new FormGroup({});
  private userDTO: UserDTO = {
    password:'',
    username: ''
  }

  public tipo_usuario: string | null = '';

  private user: User = {
    tipo_usuario: '',
    referencia_institucion: '',
    referencia_estudiante: '',
    access_token:'',
    refresh_token: ''
  }

  constructor(
    private authService : AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.tipo_usuario = this.tokenService.getTipoUsuario();
    this.formLogin= this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  login(){
    let ok = false;
    this.userDTO = this.formLogin.value;
    this.authService.login(this.userDTO)
    .subscribe( data => {
      this.user = data
      ok = true;
      console.log(this.user)
      if (this.user.tipo_usuario === 'estudiante'){
        this.router.navigate(['/profile/home'])
      }else if(this.user.tipo_usuario === 'institucion'){
        this.router.navigate(['/dashboard'])
      }else if (this.user.tipo_usuario === 'administrador'){
        this.router.navigate(['/school/read'])
      }
      console.log(ok)
    },
    (err: HttpErrorResponse ) =>{
      alert('Datos Incorrectos')
    })
  }

}
