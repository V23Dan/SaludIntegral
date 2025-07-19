// interfaces/body-report.interface.ts

export interface DatosFisicos {
  _id: string;
  sexo: string;
  altura: number;
  peso: number;
  edad: number;
  usuario: string;
  createdAt: string;
  updatedAt: string;
}

export interface Usuario {
  _id: string;
  nombre: string;
  apellido: string;
  correo: string;
}

export interface BodyReport {
  _id: string;
  usuario: string | Usuario;
  imc: number;
  clasificacionIMC: string;
  porcentajeGrasaCorporal: number;
  clasificacionGrasa: string;
  metodoDeCalculo: string;
  observaciones: string;
  somatotipo: string;
  datosFisicos: string | DatosFisicos;
  createdAt: string;
  updatedAt: string;
}

export interface BodyReportResponse {
  message: string;
  reporte: BodyReport;
}

export interface BodyReportsResponse {
  message: string;
  reportes: BodyReport[];
  total: number;
}

export interface IMCResponse {
  message: string;
  imc: number;
  clasificacionIMC: string;
  datosFisicos: {
    peso: number;
    altura: number;
  };
}

export interface GrasaResponse {
  message: string;
  porcentajeGrasaCorporal: number;
  clasificacionGrasa: string;
  metodoDeCalculo: string;
  datosFisicos: {
    peso: number;
    altura: number;
    edad: number;
    sexo: string;
  };
}

export interface ApiResponse {
  message: string;
}
