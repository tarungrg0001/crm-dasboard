import { Component, effect } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Resource } from '../../../services/resource';

@Component({
  selector: 'crm-crm-user',
  imports: [FormsModule],
  templateUrl: './crm-user.html',
  styleUrl: './crm-user.scss',
})
export class CrmUser {
  public userContent: any;

  constructor(private _resource: Resource) {
    effect(() => {
      this.userContent = this._resource.content().user;
    });
  }

  public onSubmit(form: NgForm) {}
}
