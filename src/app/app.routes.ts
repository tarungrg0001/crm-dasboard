import { Routes } from '@angular/router';
import { CrmDashboard } from './components/crm-dashboard/crm-dashboard';
import { CrmAssignments } from './components/crm-assignments/crm-assignments';
import { CrmUsers } from './components/crm-users/crm-users';
import { CrmAssignment } from './components/crm-assignments/crm-assignment/crm-assignment';
import { CrmUser } from './components/crm-users/crm-user/crm-user';
import { CrmSites } from './components/crm-sites/crm-sites';
import { CrmSite } from './components/crm-sites/crm-site/crm-site';

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
  {
    path: 'users',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CrmUsers,
      },
      { path: 'user', component: CrmUser },
      { path: 'user/:id', component: CrmUser },
    ],
  },
  {
    path: 'sites',
    children: [
      { path: '', pathMatch: 'full', component: CrmSites },
      { path: 'site', component: CrmSite },
    ],
  },
];
