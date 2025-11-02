import { Routes } from '@angular/router';
import { CrmDashboard } from './components/crm-dashboard/crm-dashboard';
import { CrmAssignments } from './components/crm-assignments/crm-assignments';
import { CrmUsers } from './components/crm-users/crm-users';
import { CrmAssignment } from './components/crm-assignments/crm-assignment/crm-assignment';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: CrmDashboard },
  {
    path: 'assignments',
    children: [
      { path: '', component: CrmAssignments, pathMatch: 'full' },
      { path: 'assignment', component: CrmAssignment },
    ],
  },
  { path: 'users', component: CrmUsers },
];
