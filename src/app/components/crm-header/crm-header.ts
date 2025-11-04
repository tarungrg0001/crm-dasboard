import { Component, effect } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGlobe,
  faMagnifyingGlass,
  faQuestionCircle,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

import { Resource } from '../../services/resource';
// import { CrmInput } from '../../shared/crm-input/crm-input';
import { CrmDropdown } from '../../shared/crm-dropdown/crm-dropdown';

@Component({
  selector: 'crm-header',
  imports: [FontAwesomeModule, CrmDropdown],
  templateUrl: 'crm-header.html',
  styleUrls: ['crm-header.scss'],
})
export class CrmHeader {
  public helpIcon = faQuestionCircle;
  public userIcon = faUserCircle;
  public searchIcon = faMagnifyingGlass;
  public globeIcon = faGlobe;
  public headerContent: any;
  public showOptions: boolean = false;
  public languagesPresent = [
    { name: 'English', code: 'en' },
    { name: 'German', code: 'de' },
  ];

  constructor(private _resource: Resource) {
    effect(() => {
      if (this._resource.content()) {
        this.headerContent = this._resource.content().header;
      }
    });
  }

  public changeLanguage(langCode: string): void {
    this._resource.getNewLanguageContent(langCode);
    this.showOptions = false;
  }

  public showLanguages(): void {
    this.showOptions = !this.showOptions;
  }
}
