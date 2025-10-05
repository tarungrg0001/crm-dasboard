import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass,
  faQuestionCircle,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'crm-header',
  imports: [FontAwesomeModule],
  templateUrl: 'crm-header.html',
  styleUrls: ['crm-header.scss'],
})
export class CrmHeader implements OnInit {
  public searchIcon = faMagnifyingGlass;
  public helpIcon = faQuestionCircle;
  public userIcon = faUserCircle;

  public ngOnInit(): void {}
}
