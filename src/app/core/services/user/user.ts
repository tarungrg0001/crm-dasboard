import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../../model/user';
import { createUser, deleteUser } from '../../../store/users/users.actions';
import { getUserById, noOfUsers } from '../../../store/users/users.selector';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _store = inject(Store<{ users: User[] }>);
  constructor() {}

  public getUser(id: number) {
    return this._store.select(getUserById(id));
  }

  public deleteUser(id: number) {
    this._store.dispatch(deleteUser({ value: id }));
  }

  public getUsersLength() {
    return this._store.select(noOfUsers);
  }

  public addUser(user: User) {
    this._store.dispatch(createUser({ value: user }));
  }
}
