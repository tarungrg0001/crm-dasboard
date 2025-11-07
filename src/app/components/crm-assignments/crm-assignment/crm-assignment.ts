import { Component, effect, inject, OnInit, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faClose, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  ColDef,
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
  RowSelectionOptions,
} from 'ag-grid-community';

import { CrmDropdown } from '../../../shared/crm-dropdown/crm-dropdown';
import { CrmBadgeControlComponent } from '../../../shared/crm-badge-form-control-wrapper/crm-badge-form-control-wrapper';
import { CrmModal } from '../../../shared/crm-modal/crm-modal';
import { CrmButtonBadgeControl } from '../../../shared/crm-button-badge-form-control/crm-button-badge-form-control';
import { Resource } from '../../../core/services/resource';
import { UserService } from '../../../core/services/user/user';
import { SiteService } from '../../../core/services/site';
import { User } from '../../../model/user';
import { Site } from '../../../model/site';
import { CommonModule } from '@angular/common';
import { AssignmentsService } from '../../../core/services/assignments';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'crm-crm-assignment',
  imports: [
    FontAwesomeModule,
    CrmBadgeControlComponent,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    CrmDropdown,
    CrmModal,
    AgGridAngular,
    CrmButtonBadgeControl,
  ],
  templateUrl: './crm-assignment.html',
  styleUrl: './crm-assignment.scss',
})
export class CrmAssignment implements OnInit {
  public readonly downIcon = faChevronDown;
  public readonly addIcon = faPlusCircle;
  public readonly closeIcon = faClose;
  public assignmentContent!: any;
  public show = signal<boolean>(false);
  public heading!: string;
  public assignedToList: string[] = [];
  public selectedSite!: string;
  public assignmentForm!: FormGroup;
  public mode = '';
  public colDef!: ColDef[];
  public rowSelection: RowSelectionOptions = { mode: 'multiRow' };
  public data: any;
  public id: number;
  private myGridApi!: GridApi;
  private gridModalOpenBy: 'site' | 'assignedTo' | undefined;
  private _userList: User[] = [];
  private _siteList: Site[] = [];

  private _resource = inject(Resource);
  private _userService = inject(UserService);
  private _siteService = inject(SiteService);
  private _formBuilder = inject(FormBuilder);
  private _activatedRoute = inject(ActivatedRoute);
  private _assignmentService = inject(AssignmentsService);

  constructor() {
    effect(() => {
      this.assignmentContent = this._resource.content().assignment;
    });
    this.id = +this._activatedRoute.snapshot.params['id'];
  }

  public onSubmit() {
    this._assignmentService.getNoOfAssignment().subscribe((res) => {
      this.assignmentForm.get('id')?.setValue(+res + 1);
    });
    this._assignmentService.createAssignment(this.assignmentForm.value);
    this.assignmentForm.reset();
  }

  public ngOnInit(): void {
    this.initializeForm();
    this._userService.getUsers().subscribe((res) => {
      this._userList = res;
    });
    this._siteService.getSites().subscribe((res) => {
      this._siteList = res;
    });
    if (this.id) {
      this.mode = this._activatedRoute.snapshot.queryParams['mode'];
      this._assignmentService.getAssignment(this.id).subscribe((res: any) => {
        this.setAssignedToControls(res.assignedTo);

        this.assignmentForm.patchValue({
          id: res.id,
          status: res.status,
          assignedBy: res.assignedBy,
          assignedOn: res.assignedOn,
          dueOn: res.dueOn,
          site: res.site,
          note: res.note,
        });
        this.assignmentForm.disable();
      });
    }
  }

  private setAssignedToControls(assignedTo: []) {
    assignedTo.forEach((value) => {
      (this.assignmentForm.get('assignedTo') as FormArray).push(new FormControl(value));
    });
  }

  private initializeForm() {
    this.assignmentForm = this._formBuilder.group({
      id: ['', Validators.required],
      status: ['not-started'],
      assignedBy: ['', Validators.required],
      assignedTo: new FormArray<FormControl<string | null>>([]),
      assignedOn: ['', Validators.required],
      dueOn: [''],
      site: [''],
      note: [''],
    });
  }

  public setupGrid(usedBy: 'site' | 'assignedTo') {
    this.gridModalOpenBy = usedBy;
    this.rowSelection = usedBy === 'site' ? { mode: 'singleRow' } : { mode: 'multiRow' };
    this.heading = `Select ${usedBy !== 'assignedTo' ? usedBy : 'Users'}`;
    if (usedBy === 'assignedTo') {
      this.colDef = [{ field: 'name', flex: 1, resizable: false }];
      this.data = this._userList;
    } else {
      this.colDef = [{ field: 'organisation', flex: 1, resizable: false }];
      this.data = this._siteList;
    }
    this.show.set(true);
  }

  public onGridReady(event: GridReadyEvent) {
    this.myGridApi = event.api;
  }

  public selectedStatus(status: any) {
    this.assignmentForm.get('status')?.setValue(status);
  }

  public closeGrid(action: string) {
    if (action === 'save') {
      if (this.gridModalOpenBy === 'assignedTo') {
        this.myGridApi.getSelectedRows().forEach((row) => {
          (this.assignmentForm.get('assignedTo') as FormArray<FormControl<string>>)?.push(
            new FormControl(row.name)
          );
        });
      } else if (this.gridModalOpenBy === 'site') {
        this.assignmentForm.get('site')?.setValue(this.myGridApi.getSelectedRows()[0].organisation);
      }
    }
    this.show.set(false);
  }
}
