import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PhysicalDataService } from '../../../services/physicalData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export default class ModalComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Input() usuarioId: string | null = null;
  @Output() perfilActualizado = new EventEmitter<any>();

  perfilForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private physicalData: PhysicalDataService,
    private router: Router
  ) {
    this.perfilForm = this.fb.group({
      sexo: ['', [Validators.required]],
      edad: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?:1[01][0-9]|120|[1-9][0-9]?)$'),
          Validators.min(18),
          Validators.max(90),
        ],
      ],
      altura: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(0\\.[5-9]|1(\\.[0-9]{1,2})?|2(\\.[0-4][0-9]?|\\.5)?)$'
          ),
          Validators.min(0.6),
          Validators.max(2.5),
        ],
      ],
      peso: [
        '',
        [
          Validators.required,
          Validators.pattern('^([1-9][0-9]{0,2})(\\.[0-9]{1,2})?$'),
          Validators.min(30),
          Validators.max(300),
        ],
      ],
    });
  }

  async onSubmit(): Promise<void> {
    const formValues = this.perfilForm.value;

    const isAnyFieldFilled = Object.values(formValues).some(
      (value) => value && value.toString().length > 0
    );

    if (!isAnyFieldFilled) {
      this.errorMessage = 'Debes completar al menos un campo para actualizar.';
      return;
    }

    if (this.perfilForm.invalid) {
      Object.keys(this.perfilForm.controls).forEach((field) => {
        const control = this.perfilForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const response = await this.physicalData.registerPhysicalData(formValues);
      this.successMessage = 'Datos fisicos guardados exitosamente';
      this.perfilActualizado.emit(response);
    } catch (error: any) {
      this.errorMessage = error?.message || 'Error al cargar datos';
    } finally {
      this.loading = false;
    }
  }

  onCerrar(): void {
    this.cerrar.emit();
    this.router.navigate(['dashboard/SaludFisica']);
  }

  esInvalido(campo: string): boolean {
    const control = this.perfilForm.get(campo);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

}
