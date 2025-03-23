import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../interfaces/user-interface';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/user'; // Ajusta esta URL según tu configuración

  constructor() { }

  /**
   * Obtiene la información del usuario autenticado
   * @returns Observable con los datos del usuario
   */
  getUserInfo(): Observable<User> {
    return from(axios.get(`${this.apiUrl}/getInfoUser`, {
      withCredentials: true
    })).pipe(
      map(response => {
        if (response.data && response.data.success) {
          return response.data.user as User;
        }
        throw new Error('No se pudo obtener la información del usuario');
      }),
      catchError(error => {
        console.error('Error al obtener información del usuario:', error);
        throw error;
      })
    );
  }

  /**
   * Verifica si hay un usuario autenticado y devuelve su información
   * Si no hay usuario autenticado, devuelve null
   * @returns Observable<User | null>
   */
  getCurrentUser(): Observable<User | null> {
    return from(axios.get(`${this.apiUrl}/getInfoUser`, {
      withCredentials: true
    })).pipe(
      map(response => {
        if (response.data && response.data.success) {
          return response.data.user as User;
        }
        return null;
      }),
      catchError(() => {

        return from([null]);
      })
    );
  }

  /**
   * Actualiza la información del usuario
   * @param userData Datos del usuario a actualizar
   * @returns Observable con la respuesta
   */
  updateUserInfo(userData: Partial<User>): Observable<any> {
    return from(axios.put(`${this.apiUrl}/getInfoUser`, userData, {
      withCredentials: true
    })).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error al actualizar información del usuario:', error);
        throw error;
      })
    );
  }
}
