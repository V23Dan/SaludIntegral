import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  // Alerta tipo Toast
  showToast(message: string, icon: 'success' | 'error' | 'info' | 'warning') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: message || 'Operación completada', // Verificar que el mensaje no sea nulo
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        popup: 'bg-blue-600 text-gray-800 rounded-lg p-4 shadow-lg',
        title: 'text-sm font-bold',
        icon: 'text-white',
      },
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  }
}
