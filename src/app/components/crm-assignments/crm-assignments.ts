import { CommonModule, DatePipe } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import {
  faArrowDownShortWide,
  faFilter,
  faMagnifyingGlass,
  faPlus,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ModuleRegistry,
  AllCommunityModule,
  ColDef,
  GridReadyEvent,
  GridApi,
} from 'ag-grid-community';

import { Resource } from '../../services/resource';
import { CrmBadge } from '../../shared/crm-badge/crm-badge';
import { CrmActionRenderer } from '../../shared/tables/crm-action-renderer/crm-action-renderer';
import { CrmInput } from '../../shared/crm-input/crm-input';
import { CrmDropdown } from '../../shared/crm-dropdown/crm-dropdown';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'crm-assignments',
  imports: [FontAwesomeModule, AgGridAngular, CommonModule, CrmInput],
  providers: [DatePipe],
  templateUrl: './crm-assignments.html',
  styleUrl: './crm-assignments.scss',
})
export class CrmAssignments implements OnInit {
  public assignmentContent: any;
  public tableContent: any;
  public uploadIcon = faUpload;
  public plusIcon = faPlus;
  public searchIcon = faMagnifyingGlass;
  public readonly sortIcon = faArrowDownShortWide;
  public readonly filterIcon = faFilter;
  public searchConfig: any;
  public colDef!: ColDef[];
  public filterArray!: string[];
  public data = [
    {
      assignmentId: 1,
      assignmentTo: ['TG'],
      metric: 'M1',
      site: 'S1',
      status: 'not-started',
      assignedDate: new Date(),
      dueDate: new Date(),
    },
    {
      assignmentId: 2,
      assignmentTo: ['TG', 'AS'],
      metric: 'M1',
      site: 'S1',
      status: 'completed',
      assignedDate: new Date('05-29-2025'),
      dueDate: new Date(),
    },
  ];

  private myGridApi!: GridApi;
  constructor(private _resource: Resource, private _datePipe: DatePipe) {
    effect(() => {
      this.assignmentContent = this._resource.content().assignments;
      this.tableContent = this._resource.content().assignments.table;
      this.searchConfig = {
        placeholder: this.assignmentContent?.search,
        width: '402px',
        height: '38px',
        fontSize: '12px',
        icon: this.searchIcon,
      };
      this.defineColumns();
      this.filterArray = this.tableContent.headers.splice(-1, 1);
    });
  }

  public ngOnInit(): void {}

  private defineColumns() {
    this.colDef = [
      {
        field: 'assignmentId',
        headerName: this.tableContent.headers[0],
        filter: true,
        sort: 'desc',
      },
      {
        field: 'assignmentTo',
        cellRenderer: CrmBadge,
        cellRendererParams: { type: 'round' },
        headerName: this.tableContent.headers[1],
        filter: true,
      },
      { field: 'metric', headerName: this.tableContent.headers[2], filter: true },
      { field: 'site', headerName: this.tableContent.headers[3], filter: true },
      {
        field: 'status',
        cellRenderer: CrmBadge,
        cellRendererParams: { type: 'oval' },
        headerName: this.tableContent.headers[4],
        filter: true,
      },
      {
        field: 'assignedDate',
        headerName: this.tableContent.headers[5],
        valueFormatter: (params): string => {
          return this._datePipe.transform(params.value, 'dd/MM/yyyy') ?? '';
        },
        filter: 'agDateColumnFilter',
      },
      {
        field: 'dueDate',
        headerName: this.tableContent.headers[6],
        valueFormatter: (params): string => {
          return this._datePipe.transform(params.value, 'dd/MM/yyyy') ?? '';
        },
        filter: 'agDateColumnFilter',
      },
      {
        field: 'Action',
        headerName: this.tableContent.headers[7],
        resizable: false,
        cellRenderer: CrmActionRenderer,
      },
    ];
  }

  public onReady(event: GridReadyEvent): void {
    this.myGridApi = event.api;
    this.myGridApi.sizeColumnsToFit();
  }
}
