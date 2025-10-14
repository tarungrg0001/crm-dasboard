import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Assignments } from './components/assignments/assignments';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: Dashboard },
  { path: 'assignments', component: Assignments },
];
