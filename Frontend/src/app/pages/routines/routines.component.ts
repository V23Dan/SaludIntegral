import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutineService } from '../../services/routine.service';
import { CommonModule } from '@angular/common';

export interface Ejercicio {
  nombre: string;
  series: number;
  repeticiones: number;
  descanso: number;
}

export interface Routine {
  _id?: string;
  nombre: string;
  dificultad: string;
  ejercicios: Ejercicio[];
  fechaCreacion?: Date;
  duracion?: number;
  usuario?: string;
  usuario_info?: {
    nombre: string;
    correo: string;
  };
  total?: number;
  promedioDuracion?: number;
  ejercicio?: Ejercicio;
}

@Component({
  selector: 'app-routine',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.css',
})
export default class RutinaComponent {
  modalAbierto = false;

  nuevaRutina = {
    nombre: '',
    descripcion: '',
    duracion: '',
    nivel: '',
  };

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.resetFormulario();
  }

  resetFormulario() {
    this.nuevaRutina = {
      nombre: '',
      descripcion: '',
      duracion: '',
      nivel: '',
    };
  }
  routineForm: FormGroup;
  ejercicioForm: FormGroup;
  ejerciciosTemp: Ejercicio[] = [];

  routines: Routine[] = [];
  filteredRoutines: Routine[] = [];
  loading = false;
  error = '';
  success = '';

  // Opciones de filtro
  selectedFilter = 'none';
  dificultadFilter = '';
  limitValue = 5;
  skipValue = 0;

  // Controles de UI
  showAddExerciseForm = false;
  showFilterOptions = false;

  constructor(private fb: FormBuilder, private routineService: RoutineService) {
    this.routineForm = this.fb.group({
      nombre: ['', [Validators.required]],
      dificultad: ['', [Validators.required]],
      fechaCreacion: [new Date(), [Validators.required]],
      duracion: [0, [Validators.required, Validators.min(1)]],
    });

    this.ejercicioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      series: [0, [Validators.required, Validators.min(1)]],
      repeticiones: [0, [Validators.required, Validators.min(1)]],
      descanso: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadAllRoutines();
  }

  async loadAllRoutines(): Promise<void> {
    try {
      this.loading = true;
      this.error = '';
      const data = await this.routineService.sortByDate();
      this.routines = data;
      this.filteredRoutines = [...this.routines];
      this.loading = false;
    } catch (err: any) {
      this.error = err.message || 'Error al cargar rutinas';
      this.loading = false;
    }
  }

  toggleAddExerciseForm(): void {
    this.showAddExerciseForm = !this.showAddExerciseForm;
    if (this.showAddExerciseForm) {
      this.ejercicioForm.reset({
        nombre: '',
        series: 0,
        repeticiones: 0,
        descanso: 0,
      });
    }
  }

  toggleFilterOptions(): void {
    this.showFilterOptions = !this.showFilterOptions;
  }

  addEjercicio(): void {
    if (this.ejercicioForm.valid) {
      this.ejerciciosTemp.push(this.ejercicioForm.value);
      this.ejercicioForm.reset({
        nombre: '',
        series: 0,
        repeticiones: 0,
        descanso: 0,
      });
      this.success = 'Ejercicio agregado a la rutina';
      setTimeout(() => (this.success = ''), 3000);
    }
  }

  removeEjercicio(index: number): void {
    this.ejerciciosTemp.splice(index, 1);
  }

  async submitRoutine(): Promise<void> {
    if (this.routineForm.valid && this.ejerciciosTemp.length > 0) {
      try {
        this.loading = true;
        this.error = '';

        const routineData = {
          ...this.routineForm.value,
          ejercicios: this.ejerciciosTemp,
        };

        await this.routineService.createRoutine(routineData);
        this.success = 'Rutina creada con éxito';

        // Resetear formulario
        this.routineForm.reset({
          nombre: '',
          dificultad: '',
          fechaCreacion: new Date(),
          duracion: 0,
        });
        this.ejerciciosTemp = [];

        await this.loadAllRoutines();
        this.loading = false;

        setTimeout(() => (this.success = ''), 3000);
      } catch (err: any) {
        this.error = err.message || 'Error al crear la rutina';
        this.loading = false;
      }
    } else {
      this.error =
        'Completa todos los campos requeridos y agrega al menos un ejercicio';
      setTimeout(() => (this.error = ''), 3000);
    }
  }

  async applyFilter(): Promise<void> {
    try {
      this.loading = true;
      this.error = '';

      switch (this.selectedFilter) {
        case 'grouped':
          const groupedData = await this.routineService.groupByDifficulty();
          this.filteredRoutines = groupedData.map((group: any) => ({
            nombre: `Grupo: ${group._id}`,
            dificultad: group._id,
            ejercicios: [],
            total: group.total,
            promedioDuracion: group.promedioDuracion,
          }));
          break;

        case 'projected':
          this.filteredRoutines =
            await this.routineService.projectRoutineFields();
          break;

        case 'sorted':
          this.filteredRoutines = await this.routineService.sortByDate();
          break;

        case 'difficulty':
          if (this.dificultadFilter) {
            this.filteredRoutines = await this.routineService.matchByDificultad(
              this.dificultadFilter
            );
          } else {
            this.error = 'Selecciona una dificultad';
          }
          break;

        case 'limit':
          this.filteredRoutines = await this.routineService.limitRoutines(
            this.limitValue
          );
          break;

        case 'skip':
          this.filteredRoutines = await this.routineService.skipRoutines(
            this.skipValue
          );
          break;

        case 'unwind':
          const unwoundData = await this.routineService.unwindExercises();
          this.filteredRoutines = unwoundData;
          break;

        case 'lookup':
          this.filteredRoutines =
            await this.routineService.lookupUserRoutines();
          break;

        default:
          await this.loadAllRoutines();
          break;
      }

      this.loading = false;
    } catch (err: any) {
      this.error = err.message || 'Error al aplicar filtro';
      this.loading = false;
    }
  }

  resetFilters(): void {
    this.selectedFilter = 'none';
    this.dificultadFilter = '';
    this.limitValue = 5;
    this.skipValue = 0;
    this.loadAllRoutines();
  }
}
