import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../model/user';

// export const selectUserState = createFeatureSelector<{ users: User[] }>('users');

// export const getUsers = createSelector(selectUserState, (state: { users: User[] }) => state.users);
export const getUsers = (state: { users: User[] }) => state.users;

export const getUserById = (userId: number) =>
  createSelector(getUsers, (users) => users.find((u) => u.id === userId));
