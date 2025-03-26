import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export default class NavComponent {
  isUserMenuOpen: boolean = false;
  isUserLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  Perfil() {
    this.authService.info();
    this.isUserMenuOpen = false;
  }

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
      // Navega a la página de inicio y fuerza una actualización del estado
      await this.router.navigateByUrl('/');
      this.checkLoginStatus();
      this.isUserMenuOpen = false;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
