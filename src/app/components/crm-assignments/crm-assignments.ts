import { Component, effect } from '@angular/core';
import { Resource } from '../../services/resource';
import { faMagnifyingGlass, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CrmTable } from '../../shared/tables/crm-table/crm-table';

@Component({
  selector: 'crm-assignments',
  imports: [FontAwesomeModule, CrmTable],
  templateUrl: './crm-assignments.html',
  styleUrl: './crm-assignments.scss',
})
export class CrmAssignments {
  public assignmentContent: any;
  public uploadIcon = faUpload;
  public plusIcon = faPlus;
  public searchIcon = faMagnifyingGlass;

  constructor(private _resource: Resource) {
    effect(() => {
      this.assignmentContent = this._resource.content().assignments;
    });
  }
}
