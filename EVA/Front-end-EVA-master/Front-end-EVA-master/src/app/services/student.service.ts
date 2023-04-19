import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DTOStudent, Student } from '../models/student.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8003/instituciones';
  private idSchool = this.tokenService.getIdSchool();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }


  getAllStudentBySchool(){
    return this.http.get<Student[]>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/estudiantes`)
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

  getStudentById(id: string | null){
    return this.http.get<Student>(`${this.apiUrl}/${this.idSchool}/estudiantes/${id}`)
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

  createStudent(dto: DTOStudent){
    return this.http.post<Student>(`${this.apiUrl}/${this.idSchool}/estudiantes`, dto)
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

  updateStudent(id: string|null, dto: DTOStudent){
    return this.http.put<Student>(`${this.apiUrl}/${this.idSchool}/estudiantes/${id}`, dto)
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

  deleteStudent(id: string){
    return this.http.delete<String>(`${this.apiUrl}/${this.idSchool}/estudiantes/${id}`)
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

  getProfileStudent(id: string){
    return this.http.get<Student>(`${this.apiUrl}/${this.idSchool}/estudiantes/${id}/perfil`)
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

  updateProfileStudent(id: string|null, dto: any){
    return this.http.put<Student>(`${this.apiUrl}/${this.idSchool}/estudiantes/${id}/perfil_contexto`, dto)
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


  getRecomendation(){
    return this.http.get<any>(`${this.apiUrl}/${this.idSchool}/estudiantes/${this.tokenService.getIdStudent()}/recomendaciones`)
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
