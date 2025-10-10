import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBarChart,
  faBuilding,
  faCircleCheck,
  faRefresh,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'crm-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.scss'],
  imports: [FontAwesomeModule],
})
export class Dashboard {
  public refreshIcon = faRefresh;
  public usersIcon = faUsers;

  public cardData = [
    {
      id: 1,
      header: {
        label: 'Users',
        icon: faUsers,
      },
      content: 28,
      percent: '3.2%',
    },
    {
      id: 2,
      header: {
        label: 'Active Sites',
        icon: faBuilding,
      },
      content: 92,
      percent: '3.2%',
    },
    {
      id: 3,
      header: {
        label: 'Assignments',
        icon: faCircleCheck,
      },
      content: 392,
      percent: '3.2%',
    },
    {
      id: 4,
      header: {
        label: 'ESG Metrics',
        icon: faBarChart,
      },
      content: 32,
      percent: '3.2%',
    },
  ];
}
