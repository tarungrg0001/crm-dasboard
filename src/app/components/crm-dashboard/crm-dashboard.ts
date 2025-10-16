import { Component, effect, OnInit } from '@angular/core';
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
  templateUrl: 'crm-dashboard.html',
  styleUrls: ['crm-dashboard.scss'],
  imports: [FontAwesomeModule],
})
export class CrmDashboard implements OnInit {
  public refreshIcon = faRefresh;
  public usersIcon = faUsers;
  public dashboardContent: any;

  private readonly iconMapping = [faUsers, faBuilding, faCircleCheck, faBarChart];

  private readonly data = [
    { content: 28, percent: '3.2%' },
    { content: 92, percent: '3.2%' },
    { content: 392, percent: '3.2%' },
    { content: 32, percent: '3.2%' },
  ];
  public cardData: any[] = [];

  constructor(private _resource: Resource) {
    effect(() => {
      this.dashboardContent = this._resource.content().dashboard;
      this.cardData = [];
      this.initiateContent();
    });
  }

  public ngOnInit(): void {}

  private initiateContent() {
    this.dashboardContent.card.headingOptions.forEach((option: string, index: number) => {
      this.cardData.push({
        id: index,
        header: {
          label: option,
          icon: this.iconMapping[index],
        },
        content: this.data[index].content,
        percent: this.data[index].percent,
      });
    });
  }
}
