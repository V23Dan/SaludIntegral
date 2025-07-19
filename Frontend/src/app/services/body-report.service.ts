import { Injectable } from '@angular/core';
import axios from 'axios';
import { DatosFisicos } from '../interfaces/body-report.interface';

@Injectable({
  providedIn: 'root'
})
export class BodyReportService {
  private baseUrl = 'http://localhost:5000/bodyReport'; // Ajusta la URL según tu configuración

  constructor() {
    // Configurar axios para incluir cookies automáticamente
    axios.defaults.withCredentials = true;
  }

  // Crear reporte completo
  async crearReporte(observaciones?: string) {
    try {
      const response = await axios.post(this.baseUrl, { observaciones });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  // Obtener todos los reportes del usuario
  async obtenerReportes() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  // Obtener reporte específico por ID
  async obtenerReportePorId(id: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  // Obtener último reporte
  async obtenerUltimoReporte() {
    try {
      const response = await axios.get(`${this.baseUrl}/ultimo`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  // Eliminar reporte
  async eliminarReporte(id: string) {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  // Calcular solo IMC
  async calcularIMC() {
    try {
      const response = await axios.get(`${this.baseUrl}/calcular-imc`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }

  // Calcular solo grasa corporal
  async calcularGrasaCorporal() {
    try {
      const response = await axios.get(`${this.baseUrl}/calcular-grasa`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
}
