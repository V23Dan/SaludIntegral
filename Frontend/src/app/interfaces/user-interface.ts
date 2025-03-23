export interface User {
  _id?: string;
  nombre: string;
  apellido: string;
  correo: string;
  tipoUsuario?: string;
  roles?: Role[];
}

export interface Role {
  _id: number;
  name: string;
  description?: string;
}
