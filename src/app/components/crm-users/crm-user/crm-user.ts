import { Component, effect, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { Resource } from '../../../services/resource';
import { createUser } from '../../../store/users/users.actions';
import { User } from '../../../model/user';
import { getUsers } from '../../../store/users/users.selector';
import { UserService } from '../../../services/user/user';

@Component({
  selector: 'crm-crm-user',
  imports: [FormsModule, CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './crm-user.html',
  styleUrl: './crm-user.scss',
})
export class CrmUser implements OnInit {
  public userContent: any;
  public readonly errorIcon = faExclamationCircle;
  public readonly mode?: string;

  public user: any =
    // { name: string | null; email: string | null; contact: number | null }
    {
      name: null,
      email: null,
      contact: null,
    };

  private readonly id?: number;
  private noOfUsers!: number;
  private _activatedRoute = inject(ActivatedRoute);
  private _resource = inject(Resource);
  private _userService = inject(UserService);
  private _store = inject(Store<{ users: User[] }>);

  constructor() {
    this._store.select(getUsers).subscribe((res) => {
      this.noOfUsers = res.length;
    });
    effect(() => {
      this.userContent = this._resource.content().user;
    });

    this.id = +this._activatedRoute.snapshot.params['id'];
    this.mode = this._activatedRoute.snapshot.queryParams['mode'];
  }

  public ngOnInit(): void {
    if (this.id) {
      this._userService.getUser(this.id).subscribe((userData) => {
        this.user = userData;
      });
    }
  }

  public onSubmit(form: NgForm) {
    const user: User = {
      id: this.noOfUsers + 1,
      sitesAssigned: 0,
      assignments: 0,
      ...form.value,
    };
    this._store.dispatch(createUser({ value: user }));
    form.reset();
  }
}
