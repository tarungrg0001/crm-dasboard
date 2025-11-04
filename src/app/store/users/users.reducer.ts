import { createReducer, on } from '@ngrx/store';

import { User } from '../../model/user';
import { createUser, deleteUser } from './users.actions';

const initialState: User[] = [
  {
    id: 1,
    name: 'Tarun Garg',
    email: 'tarun@fake.com',
    assignments: 6,
    sitesAssigned: 12,
    contact: 9876543210,
  },
];

export const usersReducers = createReducer(
  initialState,
  on(createUser, (state, action) => {
    return [action.value, ...state];
  }),
  on(deleteUser, (state, action) => {
    return state.filter((user) => user.id !== action.value);
  })
);
