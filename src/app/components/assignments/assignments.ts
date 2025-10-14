import { Component, effect } from '@angular/core';
import { Resource } from '../../services/resource';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-assignments',
  imports: [FontAwesomeModule],
  templateUrl: './assignments.html',
  styleUrl: './assignments.scss',
})
export class Assignments {
  public assignmentContent: any;
  public uploadIcon = faUpload;
  public plusIcon = faPlus;

  constructor(private _resource: Resource) {
    effect(() => {
      this.assignmentContent = this._resource.content().assignments;
    });
  }
}
