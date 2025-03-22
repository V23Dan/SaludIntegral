import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AlertService } from '../../Alert/alert.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import * as Crypto from 'crypto-js';
import { FormGroup } from '@angular/forms';

import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export default class RegisterComponent {
  private readonly fb = inject(FormBuilder);

  formGroup = this. fb.nonNullable.group({
    nombre: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z]*$'),
      ],
    ],
    apellido: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z]*$'),
      ],
    ],
    correo: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(50)],
    ],
    documento: [
      '',
      [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    pass: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
    ],
    tipoUsuario: [
      '',
      [Validators.required]
    ],
  });

  constructor(
    private registerService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  clickRegister(): void {
    const campos = [
      { control: 'nombre', mensaje: 'Error en el campo nombre' },
      { control: 'apellido', mensaje: 'Error en el campo apellido' },
      { control: 'correo', mensaje: 'Error en el campo correo' },
      { control: 'documento', mensaje: 'Error en el campo documento' },
      { control: 'pass', mensaje: 'Error en el campo contraseña' },
      { control: 'tipoUsuario', mensaje: 'Error en el campo tipo de usuario' },
    ];

    for (const campo of campos) {
      if (
        (this.formGroup.controls as { [key: string]: AbstractControl })[
          campo.control
        ].errors
      ) {
        this.alertService.showToast(campo.mensaje, 'error');
        return; // Sale después de mostrar el primer error encontrado
      }
    }
    const password = this.formGroup.value.pass || '';
    const encryptedPass = Crypto.SHA256(password).toString();

    const formData = { ...this.formGroup.value, pass: encryptedPass };
    this.registerService.registerUser(formData).then((response) => {
      if (!response) {
        Swal.fire({
          title: "ERROR",
          text: "Hubo un error al registrarse, intente de nuevo",
          icon: "error"
        });
      } else {
        Swal.fire({
          title: "REGISTRADO",
          text: "Sera direccionado al login",
          icon: "success"
        });
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
