import { createAction, props } from '@ngrx/store';
import { Assignment } from '../../model/assignment';

export const addAssignment = createAction(
  '[Assignments] Create Assignment',
  props<{ assignment: Assignment }>()
);
