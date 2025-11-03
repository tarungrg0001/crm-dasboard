import { Component, effect } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Resource } from '../../../services/resource';
import { CommonModule } from '@angular/common';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'crm-crm-user',
  imports: [FormsModule, CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './crm-user.html',
  styleUrl: './crm-user.scss',
})
export class CrmUser {
  public userContent: any;
  public readonly errorIcon = faExclamationCircle;

  public user: { name: string | null; email: string | null; mobile: number | null } = {
    name: null,
    email: null,
    mobile: null,
  };

  constructor(private _resource: Resource) {
    effect(() => {
      this.userContent = this._resource.content().user;
    });
  }

  public onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
