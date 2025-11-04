import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../model/user';
import { getUserById } from '../../store/users/users.selector';
import { deleteUser } from '../../store/users/users.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _http = inject(HttpClient);
  private _store = inject(Store<{ users: User[] }>);
  constructor() {}

  public getUser(id: number) {
    return this._store.select(getUserById(id));
  }

  public deleteUser(id: number) {
    this._store.dispatch(deleteUser({ value: id }));
  }
}
