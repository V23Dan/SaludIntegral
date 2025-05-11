import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

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
        path: 'SaludFisica',
        title: 'SaludFisica',
        // canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/salud-fisica/salud-fisica.component'),
      },
      {
        path: 'SaludMental',
        title: 'SaludMental',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/salud-mental/salud-mental.component'),
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
      {
        path: 'rutinas',
        title: 'rutinas',
        loadComponent: () => import('./pages/routines/routines.component'),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard/home',
    pathMatch: 'full',
  },
];
