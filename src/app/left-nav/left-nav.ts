import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faBell,
  faBuilding,
  faChartBar,
  faCircleCheck,
  faGear,
  faHome,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'crm-left-nav',
  templateUrl: 'left-nav.html',
  styleUrls: ['left-nav.scss'],
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
})
export class LeftNav {
  @Output() isNavCollpased: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() themeChangeEvent: EventEmitter<string> = new EventEmitter<string>();

  public leftAngleIcon = faAngleDoubleLeft;
  public rightAngleIcon = faAngleDoubleRight;
  public darkModeActive: boolean = false;
  public isNavExpanded: boolean = true;

  public userUrls = [
    {
      id: 1,
      icon: faHome,
      label: 'Dashboard',
      url: '/dashboard',
    },
    {
      id: 2,
      icon: faCircleCheck,
      label: 'Assignments',
      url: '/assignments',
    },
    {
      id: 3,
      icon: faUsers,
      label: 'Users',
      url: '/users',
    },
    {
      id: 4,
      icon: faBuilding,
      label: 'Sites',
      url: 'sites',
    },
    {
      id: 5,
      icon: faUsers,
      label: 'Metrics',
      url: 'metrics',
    },
    {
      id: 6,
      icon: faChartBar,
      label: 'Analytics',
      url: 'analytics',
    },
  ];

  public adminUrls = [
    { id: 1, icon: faBell, label: 'Notification', url: '/notifications' },
    { id: 2, icon: faGear, label: 'Settings', url: '/settings' },
  ];

  public changeNavState() {
    this.isNavExpanded = !this.isNavExpanded;
    const navCollpased = !this.isNavExpanded;
    this.isNavCollpased.emit(navCollpased);
  }

  public changeTheme() {
    this.darkModeActive = !this.darkModeActive;
    this.themeChangeEvent.emit(this.darkModeActive ? 'dark' : '');
  }
}
