import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../interfaces/user-interface';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PhysicalDataService } from '../../services/physicalData.service';
import { physicalData } from '../../interfaces/user-interface';
import { Subscription } from 'rxjs';
import ModalComponent from './modal/modal.component';

@Component({
  selector: 'app-salud-fisica',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent],
  templateUrl: './salud-fisica.component.html',
  template: ``,
  styleUrl: './salud-fisica.component.css',
})
export default class SaludFisicaComponent implements OnDestroy, OnInit {
  currentUser: User | null = null;
  physicalDataUser: physicalData | null = null;
  private subscriptions = new Subscription();

  loading = true;
  error = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private physicalData: PhysicalDataService
  ) {}

  mostrarModalEdicion = false;
  usuarioId: string | null = null;

  abrirModalEdicion() {
    this.mostrarModalEdicion = true;
  }

  cerrarModalEdicion() {
    this.mostrarModalEdicion = false;
  }

  ngOnInit(): void {
    this.loadPhysicalData();
  }

  loadPhysicalData(): void {
    const sub = this.physicalData.getPhysicalData().subscribe({
      next: (data) => {
        this.physicalDataUser = data;
        this.loading = false;
        console.log('Datos cargados:', this.physicalDataUser);
      },
      error: (err) => {
        this.error = true;
        this.errorMessage =
          err.response?.data?.message ||
          'Error al cargar los datos del usuario';
        this.loading = false;
        console.error('Error al cargar información del usuario:', err);
      },
    });
    this.subscriptions.add(sub);
  }

  hasPhysicalData(): boolean {
    return this.physicalDataUser !== null;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
