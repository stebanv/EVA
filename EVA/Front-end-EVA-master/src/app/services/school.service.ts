import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DTOCreateSchool, DTOSchool, School } from '../models/school.model';
import { TokenService } from './token.service';
import { saveAs } from 'file-saver'

@Injectable({
  providedIn: 'root'
})

export class SchoolService {

  private apiUrl = 'http://localhost:8003/instituciones';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getAllSchool(){
    return this.http.get<School[]>(this.apiUrl)
   //manejo de errores
   .pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 500){
        return throwError('No estás autorizado');
      }
      return throwError('Algo salió mal');
    })
  )
  }

  getSchoolById(id: string | null){
    return this.http.get<School>(`${this.apiUrl}/${id}`)
   //manejo de errores
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 500){
          return throwError('No estás autorizado');
        }
        return throwError('Algo salió mal');
      })
    )
  }

  createSchool(dto: DTOCreateSchool){
    console.log(JSON.stringify(dto))
    return this.http.post<School>(this.apiUrl, dto)
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

  updateSchool(id: string|null, dto: DTOSchool){
    return this.http.put<School>(`${this.apiUrl}/${id}`, dto)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo salió mal');
      })
    )

  }

  deleteSchool(id: string){
    return this.http.delete<String>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo salió mal');
      })
    )
  }

  updateProfileSchool(id: string|null, dto: any){
    return this.http.put<School>(`${this.apiUrl}/${id}/perfil_contexto`, dto)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo salió mal');
      })
    )
  }

  updateStateTest(id: string|null){
    return this.http.put<boolean>(`${this.apiUrl}/${id}/estado_test`, id)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo salió mal');
      })
    )
  }

  getStateTest(id: string|null){
    return this.http.get<boolean>(`${this.apiUrl}/${id}/estado_test`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo salió mal');
      })
    )
  }

  enabledAuth(student: any){
    return this.http.put<any>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/estudiantes/habilitar_autorizacion`, student)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo salió mal');
      })
    )

  }

  disenabledAuth(student: any){
    return this.http.put<any>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/estudiantes/deshabilitar_autorizacion`, student)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo salió mal');
      })
    )
  }

  analisisAreas(){
    return this.http.get<any>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/analisis_areas`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo salió mal');
      })
    )
  }

  analisisSubareas(){
    return this.http.get<any>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/analisis_sub_areas`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo salió mal');
      })
    )
  }

  analisisCriterios(){
    return this.http.get<any>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/analisis_criterios`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo salió mal');
      })
    )
  }

  getClusters(){
    return this.http.get<any>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/analisis_clustering`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Algo salió mal');
      })
    )
  }

  downloadResults(name: string, type: string){
    return this.http.get(`${this.apiUrl}/${this.tokenService.getIdSchool()}/reporte_individual`, {responseType: 'blob'})
    .pipe(
      tap(content =>{
        const blob = new Blob([content], {type});
        saveAs(blob, name)
      }),
      map(()=>true)
    );
  }

  getRecomendaciones(){
    return this.http.get<any>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/recomendacion_actividades`)
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
