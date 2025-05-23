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

export interface physicalData {
  sexo: string;
  edad: number;
  altura: number;
  peso: number;
}
