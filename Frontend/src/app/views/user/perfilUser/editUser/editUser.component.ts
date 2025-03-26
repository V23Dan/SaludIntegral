import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editUser.component.html',
  styleUrl: './editUser.component.css'
})
export default class EditarPerfilComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Input() usuarioId: string | null = null;
  @Output() perfilActualizado = new EventEmitter<any>();

  perfilForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.perfilForm = this.fb.group({
      _id: [''],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      tipoUsuario: [''],
      pass: ['']
    });
  }

  onSubmit(): void {
    if (this.perfilForm.invalid) {
      Object.keys(this.perfilForm.controls).forEach(field => {
        const control = this.perfilForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const userData = this.perfilForm.value;

    this.userService.updateUserInfo(userData).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = 'Perfil actualizado exitosamente';
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.response?.data?.message || 'Error al actualizar el perfil';
      }
    });
  }

  onCerrar(): void {
    this.cerrar.emit();
    this.router.navigate(["dashboard/perfil"]);
  }

  esInvalido(campo: string): boolean {
    const control = this.perfilForm.get(campo);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
