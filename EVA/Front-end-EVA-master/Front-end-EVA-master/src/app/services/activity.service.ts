import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Activity, DTOActivity } from '../models/activity.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl = 'http://localhost:8003/instituciones';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getAllActivity(){
    return this.http.get<Activity[]>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/actividades_extracurriculares`)
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

  getActivityById(id: string | null){
    return this.http.get<Activity>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/actividades_extracurriculares/${id}`)
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

  createActivity(dto: DTOActivity){
    return this.http.post<Activity>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/actividades_extracurriculares`, dto )
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

  updateActivity(id: string|null, dto: DTOActivity){
    return this.http.put<Activity>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/actividades_extracurriculares/${id}`, dto )
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

  deleteActivity(id: string){
    return this.http.delete<String>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/actividades_extracurriculares/${id}`)
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

  getAcitvityRecomendation(){
    return this.http.get<Activity[]>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/estudiantes/${this.tokenService.getIdStudent()}/recomendacion_actividades`)
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
