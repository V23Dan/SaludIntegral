import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { AlertService } from '../../Alert/alert.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent {
  private readonly fb = inject(FormBuilder);
  formGroup = this.fb.nonNullable.group({
    correo: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(50)],
    ],
    pass: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
    ],
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  clickLogin(): void {
    const campos = [
      { control: 'correo', mensaje: 'Error en el campo correo' },
      { control: 'pass', mensaje: 'Error en el campo contraseña' },
    ];

    for (const campo of campos) {
      if (
        (this.formGroup.controls as { [key: string]: AbstractControl })[
          campo.control
        ].errors
      ) {
        this.alertService.showToast(campo.mensaje, 'error');
        return;
      }
    }
    const password = this.formGroup.value.pass || '';
    const encryptedPass = CryptoJS.SHA256(password).toString();

    const formDataLogin = {
      ...this.formGroup.value,
      pass: encryptedPass,
    };
    this.authService.loginUser(formDataLogin).then((response) => {
      if (!response) {
        Swal.fire({
          title: 'Error al iniciar sesion',
          text: 'Verifique sus credenciales',
          icon: 'error',

        });

      } else {
        this.router.navigate(['/dashboard/homeAuth']);
      }
    });
  }
}
