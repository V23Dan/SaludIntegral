import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user-interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-auth',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './homeAuth.component.html',
  styleUrl: './homeAuth.component.css',
})
export default class HomeAuthComponent implements OnInit {

  currentUser: User | null = null;
  loading = true;
  error = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.loading = true;
    this.error = false;

    this.userService.getUserInfo().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.errorMessage =
          err.response?.data?.message ||
          'Error al cargar los datos del usuario';
        this.loading = false;
        console.error('Error al cargar información del usuario:', err);
      },
    });
  }

}
