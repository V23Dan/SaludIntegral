import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly registerURL = 'http://localhost:5000/auth/register';

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
}
