import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, Users } from '../models/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = 'http://localhost:8003/login';
  private idS = '62608ca0374fa0f79740e3d6'

  constructor(
    private http: HttpClient
  ) { }

  getUser(){
    return this.http.get<User>(this.apiURL)
    //manejo de errores
     .pipe(
       catchError((error: HttpErrorResponse) => {
         if (error.status == HttpStatusCode.Unauthorized){
           return throwError('No estás autorizado');
         }
         return throwError('Algo salió mal');
       })
     )
  }

  getUserName(){
    return this.http.get<Users[]>('http://localhost:8003/usuarios')
    //manejo de errores
     .pipe(
       catchError((error: HttpErrorResponse) => {
         if (error.status == HttpStatusCode.Unauthorized){
           return throwError('No estás autorizado');
         }
         return throwError('Algo salió mal');
       })
     )
  }

  changePassword(dto: any){
    return this.http.post('http://localhost:8003/change_password', dto)
    //manejo de errores
     .pipe(
       catchError((error: HttpErrorResponse) => {
         if (error.status == HttpStatusCode.Unauthorized){
           return throwError('No estás autorizado');
         }
         return throwError('Algo salió mal');
       })
     )
  }

}
