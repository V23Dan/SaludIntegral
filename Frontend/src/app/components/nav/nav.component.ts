import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export default class NavComponent {
  isUserLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  async checkLoginStatus() {
    try {
      this.isUserLoggedIn = await this.authService.isLogin();
    } catch (error) {
      console.error('Error al verificar login:', error);
      this.isUserLoggedIn = false;
    }
  }

  get isLogin(): boolean {
    return this.isUserLoggedIn;
  }

  async onLogout() {
    try {
      await this.authService.logoutUser();
      window.location.reload();
      console.log('Logout exitoso');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
