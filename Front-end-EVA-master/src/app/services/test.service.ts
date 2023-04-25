import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {Activity} from "../models/activity.model";
import {Question} from "../models/question.model";
import { Category } from '../models/category.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private apiUrl = 'http://localhost:8003';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }


  getAllQuestionsBD(){
    return this.http.get<any>(`${this.apiUrl}/test`)
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

  sendResults(dto: any){
    return this.http.post<any>(`${this.apiUrl}/analizar_resultados/${this.tokenService.getIdStudent()}`, dto)
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

  getResults(){
    return this.http.get<any>(`${this.apiUrl}/analizar_resultados/${this.tokenService.getIdStudent()}`)
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

  getCategories(){
    return this.http.get<Category[]>(`${this.apiUrl}/categorias`)
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
