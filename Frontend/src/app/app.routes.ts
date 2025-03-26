import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Title } from '@angular/platform-browser';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component'),
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./auth/login/login.component'),
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./auth/register/register.component'),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      {
        path: 'home',
        title: 'Home',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'homeAuth',
        title: 'HomeAuth',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/homeAuth/homeAuth.component'),
      },
      {
        path: 'perfil',
        title: 'PerfilUser',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./views/user/perfilUser/perfilUser.component'),
        children: [
          {
            path: 'editProfile',
            title: 'EditProfile',
            loadComponent: () =>
              import('./views/user/perfilUser/editUser/editUser.component'),
          },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard/home',
    pathMatch: 'full',
  },
];
