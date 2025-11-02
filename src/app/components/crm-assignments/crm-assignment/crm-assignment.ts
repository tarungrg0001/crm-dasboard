import { Component, effect, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faClose, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Resource } from '../../../services/resource';
import { CrmDropdown } from '../../../shared/crm-dropdown/crm-dropdown';
import { Assignment } from '../../../model/assignment';
import { CrmBadgeControlComponent } from '../../../shared/crm-badge-form-control-wrapper/crm-badge-form-control-wrapper';
import { CrmModal } from '../../../shared/crm-modal/crm-modal';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  ColDef,
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
  RowSelectionOptions,
} from 'ag-grid-community';
import { CrmButtonBadgeControl } from '../../../shared/crm-button-badge-form-control/crm-button-badge-form-control';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'crm-crm-assignment',
  imports: [
    FontAwesomeModule,
    CrmBadgeControlComponent,
    RouterLink,
    FormsModule,
    CrmDropdown,
    CrmModal,
    AgGridAngular,
    CrmButtonBadgeControl,
  ],
  templateUrl: './crm-assignment.html',
  styleUrl: './crm-assignment.scss',
})
export class CrmAssignment {
  public readonly downIcon = faChevronDown;
  public readonly addIcon = faPlusCircle;
  public readonly closeIcon = faClose;
  public assignmentContent!: any;
  public show = signal<boolean>(false);
  public heading!: string;
  public metricsList: string[] = [];
  public assignedToList: string[] = [];
  public selectedSite!: string;
  private myGridApi!: GridApi;
  private gridModalOpenBy: 'metrics' | 'site' | 'assignedTo' | undefined;

  public rowSelection: RowSelectionOptions = { mode: 'multiRow' };
  public readonly colDef: ColDef[] = [{ field: 'name', flex: 1, resizable: false }];
  public data: any;

  public assignment: Assignment = new Assignment(
    0,
    'not-started',
    '',
    new Date(),
    [],
    '',
    [],
    new Date(),
    ''
  );

  constructor(private _resource: Resource) {
    effect(() => {
      this.assignmentContent = this._resource.content().assignment;
    });
  }

  savedData: any;
  public onSubmit(form: NgForm) {
    console.log(form.value);
    this.savedData = form.value;
  }

  public setupGrid(usedBy: 'metrics' | 'site' | 'assignedTo') {
    this.gridModalOpenBy = usedBy;
    this.rowSelection = usedBy === 'site' ? { mode: 'singleRow' } : { mode: 'multiRow' };
    this.heading = `Select ${usedBy !== 'assignedTo' ? usedBy : 'Users'}`;
    if (usedBy === 'metrics') {
      this.data = [
        { name: 'Metric 1' },
        { name: 'Metric 2' },
        { name: 'Metric 3' },
        { name: 'Metric 4' },
      ];
    } else if (usedBy === 'assignedTo') {
      this.data = [{ name: 'Tarun Garg' }, { name: 'Ashish Sharma' }];
    } else {
      this.data = [{ name: 'Site 1' }, { name: 'Site 2' }];
    }
    this.show.set(true);
  }

  public onGridReady(event: GridReadyEvent) {
    this.myGridApi = event.api;
  }

  public selectedStatus(status: any) {
    this.assignment.status = status;
  }

  public closeGrid(action: 'cancel' | 'save') {
    if (action === 'save') {
      if (this.gridModalOpenBy === 'metrics') {
        this.assignment.metrics = this.myGridApi.getSelectedRows().map((row) => row.name);
      } else if (this.gridModalOpenBy === 'assignedTo') {
        this.assignment.assignedTo = this.myGridApi.getSelectedRows().map((row) => row.name);
      } else if (this.gridModalOpenBy === 'site') {
        this.assignment.site = this.myGridApi.getSelectedRows()[0].name;
      }
    }
    this.show.set(false);
  }
}
