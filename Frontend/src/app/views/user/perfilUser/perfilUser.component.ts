import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user-interface';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfilUser.component.html',
  template: `
    @if (mostrarModalEdicion) {
    <app-editar-perfil
      [usuarioId]="usuarioId"
      (perfilActualizado)="onPerfilActualizado($event)"
      (cerrar)="cerrarModalEdicion()"
    ></app-editar-perfil>
    }
  `,
  styleUrl: './perfilUser.component.css',
})
export default class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  loading = true;
  error = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  mostrarModalEdicion = false;
  usuarioId: string | null = null;

  abrirModalEdicion() {
    this.mostrarModalEdicion = true;
  }

  cerrarModalEdicion() {
    this.mostrarModalEdicion = false;
  }

  onPerfilActualizado(datosActualizados: any) {
    console.log('Perfil actualizado:', datosActualizados);
  }

  loadUserInfo(): void {
    this.loading = true;
    this.error = false;

    this.userService.getUserInfo().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.loading = false;
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
  }

  async handleDeleteUser() {
    try {
      const result = await Swal.fire({
        title: 'Estas seguro?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar cuenta!',
      });

      if (result.isConfirmed) {
        const deleteResult = await this.userService.deleteUser();
        alert(deleteResult.message);
        await this.authService.logoutUser();
        await this.router.navigateByUrl('/');
        window.location.reload();

        await Swal.fire({
          title: 'Eliminado!',
          text: 'Su cuenta fue eliminada.',
          icon: 'success',
        });
      }
    } catch (error: unknown) {
      // Manejo seguro del error
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Ocurrió un error desconocido');
      }
    }
  }
}
