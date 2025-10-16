import { Routes } from '@angular/router';
import { CrmDashboard } from './components/crm-dashboard/crm-dashboard';
import { CrmAssignments } from './components/crm-assignments/crm-assignments';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: CrmDashboard },
  { path: 'assignments', component: CrmAssignments },
];
