import { Component, ElementRef, ViewChild } from '@angular/core';
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
export class CrmHeader {
  public searchIcon = faMagnifyingGlass;
  public helpIcon = faQuestionCircle;
  public userIcon = faUserCircle;
  public isActive = false;

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
}
