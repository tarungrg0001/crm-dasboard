import { Component, computed, effect, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGlobe,
  faMagnifyingGlass,
  faQuestionCircle,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Resource } from '../../services/resource';

@Component({
  selector: 'crm-header',
  imports: [FontAwesomeModule],
  templateUrl: 'crm-header.html',
  styleUrls: ['crm-header.scss'],
})
export class CrmHeader {
  public searchIcon = faMagnifyingGlass;
  public helpIcon = faQuestionCircle;
  public userIcon = faUserCircle;
  public globeIcon = faGlobe;
  public isActive = false;
  public headerContent: any;

  constructor(private _resource: Resource) {
    effect(() => {
      if (this._resource.content()) {
        this.headerContent = this._resource.content().header;
      }
    });
  }

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  public activateInput() {
    this.isActive = true;
    setTimeout(() => this.input.nativeElement.focus(), 0);
  }

  public deactivateInput() {
    if (!this.input.nativeElement.value) {
      this.isActive = false;
    }
  }

  public changeLanguage() {
    this._resource.getNewLanguageContent();
  }
}
