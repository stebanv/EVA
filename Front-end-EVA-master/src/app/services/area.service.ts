import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Aggrement, DTOAggrenment, DTOCreateAggrenment } from '../models/aggrement.model';
import { Area } from '../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private apiUrl = 'http://localhost:8003';

  constructor(
    private http: HttpClient
  ) { }

  getAreas() {
    return this.http.get<Area[]>(`${this.apiUrl}/areas`)
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

  getAreaById(id: string|null){
    return this.http.get<Area[]>(`${this.apiUrl}/area/${id}`)
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

  getSubareas(idA: string| null){
    return this.http.get<Area[]>(`${this.apiUrl}/area/${idA}/sub_areas`)
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
