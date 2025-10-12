import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBarChart,
  faBuilding,
  faCircleCheck,
  faRefresh,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Resource } from '../../services/resource';

@Component({
  selector: 'crm-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.scss'],
  imports: [FontAwesomeModule],
})
export class Dashboard implements OnInit {
  public refreshIcon = faRefresh;
  public usersIcon = faUsers;
  public dashboardContent: any;

  private readonly iconMapping: { [key: string]: any } = {
    users: faUsers,
    activesites: faBuilding,
    assignments: faCircleCheck,
    esgmetrics: faBarChart,
  };

  private readonly data: { [ket: string]: any } = {
    users: { content: 28, percent: '3.2%' },
    activesites: { content: 92, percent: '3.2%' },
    assignments: { content: 392, percent: '3.2%' },
    esgmetrics: { content: 32, percent: '3.2%' },
  };
  public cardData: any[] = [];

  constructor(private _resource: Resource) {
    this.dashboardContent = this._resource.content().dashboard;
  }

  public ngOnInit(): void {
    this.dashboardContent.card.headingOptions.forEach((option: string, index: number) => {
      this.cardData.push({
        id: index,
        header: {
          label: option,
          icon: this.iconMapping[option.replaceAll(' ', '').toLowerCase()],
        },
        content: this.data[option.replaceAll(' ', '').toLowerCase()].content,
        percent: this.data[option.replaceAll(' ', '').toLowerCase()].percent,
      });
    });
  }
}
