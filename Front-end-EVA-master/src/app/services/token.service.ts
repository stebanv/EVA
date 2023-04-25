import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    const token = localStorage.getItem('token');
    return token;
  }

  saveIdSchool(idS: string){
    localStorage.setItem('idSchool', idS)

  }

  getIdSchool(){
    const idSchool = localStorage.getItem('idSchool')
    return idSchool;
  }

  saveIdStudent(idS: string){
    localStorage.setItem('idStudent', idS)
  }

  getIdStudent(){
    const idStudent = localStorage.getItem('idStudent')
    return idStudent;
  }

  saveTipoUsuario(tipo_usuario: string){
    localStorage.setItem('tipo_usuario', tipo_usuario);
  }

  getTipoUsuario(){
    const tipo_usuario = localStorage.getItem('tipo_usuario')
    return tipo_usuario;
  }

  getRefreshToken(){
    const refresh_token = localStorage.getItem('refresh_token')
    return refresh_token;
  }

  saveRefreshToken(refresh_token: string){
     localStorage.setItem('refresh_token', refresh_token)
  }

  logOut(){
    localStorage.clear();
  }
}
