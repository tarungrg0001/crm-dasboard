import { createAction, props } from '@ngrx/store';

import { User } from '../../model/user';

export const createUser = createAction('[Users] Create', props<{ value: User }>());

export const deleteUser = createAction('[User] Delete', props<{ value: number }>());
