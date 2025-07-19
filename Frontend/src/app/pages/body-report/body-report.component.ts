// calculadoras.component.ts
import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { BodyReportService } from '../../services/body-report.service';
import {
  BodyReport,
  IMCResponse,
  GrasaResponse,
  BodyReportsResponse,
} from '../../interfaces/body-report.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadoras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './body-report.component.html',
  styleUrls: ['./body-report.component.css'],
})
export default class CalculadorasComponent implements OnInit, OnDestroy {
  // Estados de carga
  loadingIMC = false;
  loadingGrasa = false;
  loadingReporte = false;
  loadingReportes = false;

  // Datos calculados
  imcData: IMCResponse | null = null;
  grasaData: GrasaResponse | null = null;
  reportes: BodyReport[] = [];
  ultimoReporte: BodyReport | null = null;

  // Estados de UI
  mostrarReportes = false;
  observaciones = '';
  mensaje = '';
  tipoMensaje: 'success' | 'error' | 'info' = 'info';

  constructor(private bodyReportService: BodyReportService) {}

  ngOnInit() {
    this.cargarUltimoReporte();
  }

  ngOnDestroy() {
    // Cleanup si es necesario
  }

  async calcularIMC() {
    this.loadingIMC = true;
    this.mensaje = '';
    let pesoN;

    try {
      this.imcData = await this.bodyReportService.calcularIMC();

      console.log('Datos del IMC: ', pesoN);

      this.mostrarMensaje('IMC calculado correctamente', 'success');
    } catch (error: any) {
      this.mostrarMensaje(error.message || 'Error al calcular IMC', 'error');
      this.imcData = null;
    } finally {
      this.loadingIMC = false;
    }
  }

  async calcularGrasaCorporal() {
    this.loadingGrasa = true;
    this.mensaje = '';

    try {
      this.grasaData = await this.bodyReportService.calcularGrasaCorporal();
      this.mostrarMensaje(
        'Porcentaje de grasa calculado correctamente',
        'success'
      );
    } catch (error: any) {
      this.mostrarMensaje(
        error.message || 'Error al calcular grasa corporal',
        'error'
      );
      this.grasaData = null;
    } finally {
      this.loadingGrasa = false;
    }
  }

  async generarReporteCompleto() {
    this.loadingReporte = true;
    this.mensaje = '';

    try {
      const resultado = await this.bodyReportService.crearReporte(
        this.observaciones
      );
      this.mostrarMensaje(
        'Reporte generado y guardado correctamente',
        'success'
      );
      this.observaciones = '';
      await this.cargarUltimoReporte();
    } catch (error: any) {
      this.mostrarMensaje(error.message || 'Error al generar reporte', 'error');
    } finally {
      this.loadingReporte = false;
    }
  }

  async cargarReportes() {
    this.loadingReportes = true;
    this.mensaje = '';

    try {
      const resultado: BodyReportsResponse =
        await this.bodyReportService.obtenerReportes();
      this.reportes = resultado.reportes;
      this.mostrarReportes = true;
      this.mostrarMensaje(`${resultado.total} reportes cargados`, 'info');
    } catch (error: any) {
      this.mostrarMensaje(error.message || 'Error al cargar reportes', 'error');
    } finally {
      this.loadingReportes = false;
    }
  }

  async cargarUltimoReporte() {
    try {
      const resultado = await this.bodyReportService.obtenerUltimoReporte();
      this.ultimoReporte = resultado.reporte;
    } catch (error) {
      // Silencioso, puede no haber reportes previos
    }
  }

  async eliminarReporte(id: string) {
    if (!confirm('¿Estás seguro de que deseas eliminar este reporte?')) {
      return;
    }

    try {
      await this.bodyReportService.eliminarReporte(id);
      this.mostrarMensaje('Reporte eliminado correctamente', 'success');
      await this.cargarReportes();
      await this.cargarUltimoReporte();
    } catch (error: any) {
      this.mostrarMensaje(
        error.message || 'Error al eliminar reporte',
        'error'
      );
    }
  }

  mostrarMensaje(texto: string, tipo: 'success' | 'error' | 'info') {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
    }, 5000);
  }

  obtenerClaseIMC(clasificacion: string): string {
    switch (clasificacion.toLowerCase()) {
      case 'bajo peso':
        return 'bajo-peso';
      case 'peso normal':
        return 'normal';
      case 'sobrepeso':
        return 'sobrepeso';
      default:
        return 'obesidad';
    }
  }

  obtenerClaseGrasa(clasificacion: string): string {
    switch (clasificacion.toLowerCase()) {
      case 'esencial':
        return 'esencial';
      case 'atlético':
        return 'atletico';
      case 'fitness':
        return 'fitness';
      case 'promedio':
        return 'promedio';
      default:
        return 'obeso';
    }
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
