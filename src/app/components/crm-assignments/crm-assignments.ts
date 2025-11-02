import { CommonModule, DatePipe } from '@angular/common';
import { Component, effect } from '@angular/core';
import { faMagnifyingGlass, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
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
import { CrmBadgeRenderer } from '../../shared/crm-badge/crm-badge-renderer';
import { CrmActionRenderer } from '../../shared/tables/crm-action-renderer/crm-action-renderer';
import { CrmInput } from '../../shared/crm-input/crm-input';
import { RouterLink } from '@angular/router';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'crm-assignments',
  imports: [FontAwesomeModule, AgGridAngular, CommonModule, CrmInput, RouterLink],
  providers: [DatePipe],
  templateUrl: './crm-assignments.html',
  styleUrl: './crm-assignments.scss',
})
export class CrmAssignments {
  public assignmentContent: any;
  public tableContent: any;
  public readonly uploadIcon = faUpload;
  public readonly plusIcon = faPlus;
  public readonly searchIcon = faMagnifyingGlass;
  public searchConfig: any;
  public colDef!: ColDef[];
  public filterArray!: string[];
  public data = [
    {
      assignmentId: 1,
      assignmentTo: ['Tarun Garg'],
      metric: 'M1',
      site: 'S1',
      status: 'not-started',
      assignedDate: `2025-10-30`,
      dueDate: `2025-11-05`,
    },
    {
      assignmentId: 2,
      assignmentTo: ['Tarun Garg', 'Ashish Sharma'],
      metric: 'M1',
      site: 'S1',
      status: 'completed',
      assignedDate: '2025-10-29',
      dueDate: '2025-05-10',
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
        cellRenderer: CrmBadgeRenderer,
        cellRendererParams: { type: 'round' },
        headerName: this.tableContent.headers[1],
        filter: true,
      },
      { field: 'metric', headerName: this.tableContent.headers[2], filter: true },
      { field: 'site', headerName: this.tableContent.headers[3], filter: true },
      {
        field: 'status',
        cellRenderer: CrmBadgeRenderer,
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
        filter: true,
      },
      {
        field: 'dueDate',
        headerName: this.tableContent.headers[6],
        valueFormatter: (params): string => {
          return this._datePipe.transform(params.value, 'dd/MM/yyyy') ?? '';
        },
        filter: true,
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

  public searchValue(value: string): void {
    this.myGridApi.setGridOption('quickFilterText', value);
  }
}
