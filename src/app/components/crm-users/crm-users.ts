import { Component, effect } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpload, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Resource } from '../../services/resource';

@Component({
  selector: 'crm-crm-users',
  imports: [FontAwesomeModule],
  templateUrl: './crm-users.html',
  styleUrl: './crm-users.scss',
})
export class CrmUsers {
  public readonly uploadIcon = faUpload;
  public readonly plusIcon = faPlus;
  public readonly searchIcon = faMagnifyingGlass;
  public userContent!: any;
  constructor(private _resource: Resource) {
    effect(() => {
      this.userContent = this._resource.content().users;
    });
  }
}
