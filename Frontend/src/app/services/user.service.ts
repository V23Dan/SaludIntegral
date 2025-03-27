import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../interfaces/user-interface';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:5000/user';

  constructor() {}

  getUserInfo(): Observable<User> {
    return from(
      axios.get(`${this.apiUrl}/getInfoUser`, {
        withCredentials: true,
      })
    ).pipe(
      map((response) => {
        if (response.data && response.data.success) {
          return response.data.user as User;
        }
        throw new Error('No se pudo obtener la información del usuario');
      }),
      catchError((error) => {
        console.error('Error al obtener información del usuario:', error);
        throw error;
      })
    );
  }

  getCurrentUser(): Observable<User | null> {
    return from(
      axios.get(`${this.apiUrl}/getInfoUser`, {
        withCredentials: true,
      })
    ).pipe(
      map((response) => {
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

  updateUserInfo(userData: Partial<User>): Observable<any> {
    return from(
      axios.put(`${this.apiUrl}/updateUser`, userData, {
        withCredentials: true,
      })
    ).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error al actualizar información del usuario:', error);
        throw error;
      })
    );
  }

  async deleteUser(): Promise<any> {
    try {
      const response = await axios.delete(`${this.apiUrl}/deleteUser`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Un error desconocido ha ocurrido');
      }
    }
  }
}
