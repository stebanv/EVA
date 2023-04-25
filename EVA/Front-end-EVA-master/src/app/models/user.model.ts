
export interface User {
  tipo_usuario: string,
  referencia_institucion: string,
  referencia_estudiante?: string,
  access_token: string
  refresh_token: string
}

export interface UserDTO{
  username: string,
  password: string,
}

export interface Users{
  username: string
}

