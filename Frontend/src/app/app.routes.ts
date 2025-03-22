import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: "auth",
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
    path: "dashboard",
    loadComponent: () => import('./dashboard/dashboard.component'),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
