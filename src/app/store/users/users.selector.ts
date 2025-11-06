import { createSelector } from '@ngrx/store';
import { User } from '../../model/user';

export const getUsers = (state: { users: User[] }) => state.users;

export const getUserById = (userId: number) =>
  createSelector(getUsers, (users) => users.find((u) => u.id === userId));

export const noOfUsers = (state: { users: User[] }) => state.users.length;
