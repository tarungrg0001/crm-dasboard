import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Assignment } from '../../model/assignment';
import {
  getAssignment,
  getAssignments,
  noOfAssignements,
} from '../../store/assignments/assignments.selector';
import { addAssignment } from '../../store/assignments/assignments.action';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  private _store = inject(Store<{ assignment: Assignment }>);

  public getAssignments() {
    return this._store.select(getAssignments);
  }

  public getAssignment(id: number) {
    return this._store.select(getAssignment(id));
  }

  public getNoOfAssignment() {
    return this._store.select(noOfAssignements);
  }

  public createAssignment(assignment: Assignment) {
    this._store.dispatch(addAssignment({ assignment: assignment }));
  }
}
