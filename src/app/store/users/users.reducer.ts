import { createReducer, on } from '@ngrx/store';

import { User } from '../../model/user';
import { createUser } from './users.actions';

const initialState: User[] = [
  {
    id: 1,
    name: 'Tarun Garg',
    email: 'tarun@fake.com',
    assignments: 6,
    sitesAssigned: 12,
    metricsAssigned: 20,
    mobile: 9876543210,
  },
];

export const usersReducers = createReducer(
  initialState,
  on(createUser, (state, action) => {
    return [action.value, ...state];
  })
);
