import { Component, effect } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { Resource } from '../../../services/resource';
import { createUser } from '../../../store/users/users.actions';
import { User } from '../../../model/user';
import { getUsers } from '../../../store/users/users.selector';

@Component({
  selector: 'crm-crm-user',
  imports: [FormsModule, CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './crm-user.html',
  styleUrl: './crm-user.scss',
})
export class CrmUser {
  public userContent: any;
  public readonly errorIcon = faExclamationCircle;
  private noOfUsers!: number;

  public user: { name: string | null; email: string | null; mobile: number | null } = {
    name: null,
    email: null,
    mobile: null,
  };

  constructor(private _resource: Resource, private _store: Store<{ users: User[] }>) {
    this._store.select(getUsers).subscribe((res) => {
      this.noOfUsers = res.length;
    });
    effect(() => {
      this.userContent = this._resource.content().user;
    });
  }

  public onSubmit(form: NgForm) {
    const user: User = {
      id: this.noOfUsers + 1,
      metricsAssigned: 0,
      sitesAssigned: 0,
      assignments: 0,
      ...form.value,
    };
    this._store.dispatch(createUser({ value: user }));
    form.reset();
  }
}
