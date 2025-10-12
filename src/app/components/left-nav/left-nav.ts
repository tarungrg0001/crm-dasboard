import { Component, effect, EventEmitter, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faBell,
  faBuilding,
  faChartBar,
  faCircleCheck,
  faDashboard,
  faGear,
  faHome,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Resource } from '../../services/resource';

@Component({
  selector: 'crm-left-nav',
  templateUrl: 'left-nav.html',
  styleUrls: ['left-nav.scss'],
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive, CommonModule],
})
export class LeftNav implements OnInit {
  @Output() isNavCollpased: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() themeChangeEvent: EventEmitter<string> = new EventEmitter<string>();

  public leftAngleIcon = faAngleDoubleLeft;
  public rightAngleIcon = faAngleDoubleRight;
  public darkModeActive: boolean = false;
  public isNavExpanded: boolean = true;
  public leftNavContent: any;

  private readonly userIconMapping = [
    faHome,
    faCircleCheck,
    faUsers,
    faBuilding,
    faDashboard,
    faChartBar,
  ];
  private readonly adminIconMapping = [faBell, faGear];
  public userUrls: any[] = [];

  public adminUrls: any[] = [];

  constructor(private resource: Resource) {
    effect(() => {
      this.leftNavContent = this.resource.content().navBar;
      this.adminUrls = [];
      this.userUrls = [];
      this.initiateUrls();
    });
  }

  public changeNavState(): void {
    this.isNavExpanded = !this.isNavExpanded;
    const navCollpased = !this.isNavExpanded;
    this.isNavCollpased.emit(navCollpased);
  }

  public changeTheme(): void {
    this.darkModeActive = !this.darkModeActive;
    this.themeChangeEvent.emit(this.darkModeActive ? 'dark' : '');
  }

  public ngOnInit(): void {
    //   this.initiateUrls();
  }

  private initiateUrls() {
    //User urls

    this.leftNavContent.navigationOptions.forEach((option: string, index: number) => {
      this.userUrls.push({
        id: index,
        icon: this.userIconMapping[index],
        label: option,
        url: option.toLowerCase(),
      });
    });

    //admin URLs

    this.leftNavContent.adminOptions.forEach((option: string, index: number) => {
      this.adminUrls.push({
        id: index,
        icon: this.adminIconMapping[index],
        label: option,
        url: option.toLowerCase(),
      });
    });
  }
}
