import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserDTO } from '../models/user.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://localhost:8003/login'

  constructor(
  private http: HttpClient,
  private tokenService: TokenService
    ) { }

  login(user: UserDTO){
    return this.http.post<User>(this.apiURL, user)
     .pipe(
        tap(response => {
          this.tokenService.saveToken(response.access_token)
          this.tokenService.saveIdSchool(response.referencia_institucion)
          this.tokenService.saveTipoUsuario(response.tipo_usuario)
          this.tokenService.saveRefreshToken(response.refresh_token)
          if(response.referencia_estudiante){
            this.tokenService.saveIdStudent(response.referencia_estudiante)
          }
        })
     );
  }

  refresh(){

  }
}
