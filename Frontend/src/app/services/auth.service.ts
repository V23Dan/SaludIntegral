import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly registerURL = 'http://localhost:5000/auth/register';
  constructor(private router: Router) {}

  async registerUser(userData: any): Promise<any> {
    try {
      const response = await axios.post(this.registerURL, userData);
      console.log('Datos enviados');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  private readonly loginURL = 'http://localhost:5000/auth/login';

  async loginUser(userDataLogin: any): Promise<any> {
    try {
      const response = await axios.post(this.loginURL, userDataLogin, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log('Error de login.service: ', error);
    }
  }

  async isLogin(): Promise<boolean> {
    try {
      const response = await axios.get('http://localhost:5000/auth/isLogin', {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log('Usuario autenticado');
        return true;
      } else {
        console.log('No existe token');
        return false;
      }
    } catch (error) {

      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.log('Usuario no autenticado');
      } else {
        console.error('Error inesperado en isLogin.service: ', error);
      }
      return false;
    }
  }

  async logoutUser(): Promise<any> {
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/logout',
        {},
        {
          withCredentials: true,
        }
      );
      this.router.navigate(['/dashboard/home'], { replaceUrl: true });
      return response.data;
    } catch (error) {
      console.error('Error de logout.service: ', error);
      throw error;
    }
  }
}
