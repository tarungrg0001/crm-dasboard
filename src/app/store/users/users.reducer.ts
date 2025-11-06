import { createReducer, on } from '@ngrx/store';

import { User } from '../../model/user';
import { createUser, deleteUser } from './users.actions';

// const initialState: User[] = [
//   {
//     id: 1,
//     name: '',
//     email: 'tarun@fake.com',
//     assignments: 6,
//     sitesAssigned: 12,
//     contact: 9876543210,
//   },
// ];

export const initialState: User[] = [
  {
    id: 1,
    name: 'Lucas Meyer',
    email: 'lucas.meyer@example.com',
    contact: 9876501234,
    assignments: 3,
    sitesAssigned: 1,
  },
  {
    id: 2,
    name: 'Elena Fischer',
    email: 'elena.fischer@example.com',
    contact: 9123450987,
    assignments: 7,
    sitesAssigned: 2,
  },
  {
    id: 3,
    name: 'David Thompson',
    email: 'david.thompson@example.com',
    contact: 9988776655,
    assignments: 2,
    sitesAssigned: 1,
  },
  {
    id: 4,
    name: 'Sofia Almeida',
    email: 'sofia.almeida@example.com',
    contact: 9234567812,
    assignments: 5,
    sitesAssigned: 3,
  },
  {
    id: 5,
    name: 'Akira Tanaka',
    email: 'akira.tanaka@example.com',
    contact: 9312345678,
    assignments: 9,
    sitesAssigned: 4,
  },
  {
    id: 6,
    name: 'Ben Carter',
    email: 'ben.carter@example.com',
    contact: 8765432011,
    assignments: 1,
    sitesAssigned: 1,
  },
  {
    id: 7,
    name: 'Giulia Romano',
    email: 'giulia.romano@example.com',
    contact: 9543216780,
    assignments: 8,
    sitesAssigned: 2,
  },
  {
    id: 8,
    name: 'Jonas Berg',
    email: 'jonas.berg@example.com',
    contact: 9034567123,
    assignments: 6,
    sitesAssigned: 3,
  },
  {
    id: 9,
    name: 'Maya Patel',
    email: 'maya.patel@example.com',
    contact: 9898982323,
    assignments: 4,
    sitesAssigned: 1,
  },
  {
    id: 10,
    name: 'Oliver Hayes',
    email: 'oliver.hayes@example.com',
    contact: 9753124680,
    assignments: 10,
    sitesAssigned: 4,
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
