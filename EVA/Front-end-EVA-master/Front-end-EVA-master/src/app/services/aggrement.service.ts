import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Aggrement, DTOAggrenment, DTOCreateAggrenment } from '../models/aggrement.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AggrementService {

  private apiUrl = 'http://localhost:8003/instituciones';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getAllAggrementBySchoolID(){
    return this.http.get<Aggrement[]>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/convenios`)
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

  getAggrementById(id: string | null){
    return this.http.get<Aggrement>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/convenios/${id}`)
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

  createAggrement(dto: DTOCreateAggrenment){
    return this.http.post<Aggrement>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/convenios`, dto)
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

  updateAggrement(id: string| null, dto: DTOCreateAggrenment){
    return this.http.put<Aggrement>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/convenios/${id}`, dto)
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

  deleteAggrement(id: string){
    return this.http.delete<String>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/convenios/${id}`)
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

  getAggrementsRecomendation(){
    return this.http.get<Aggrement[]>(`${this.apiUrl}/${this.tokenService.getIdSchool()}/estudiantes/${this.tokenService.getIdStudent()}/recomendacion_convenios`)
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
