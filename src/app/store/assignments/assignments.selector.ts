import { createSelector } from '@ngrx/store';

import { Assignment } from '../../model/assignment';

export const getAssignments = (state: { assignments: Assignment[] }) => state.assignments;

export const getAssignment = (assignmentId: number) =>
  createSelector(getAssignments, (assignments) =>
    assignments.find((assignment) => assignment.id === assignmentId)
  );

export const noOfAssignements = (state: { assignments: Assignment[] }) => state.assignments.length;
