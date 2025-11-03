import { Component, effect } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpload, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Resource } from '../../services/resource';
import { AgGridAngular } from 'ag-grid-angular';
import { CrmInput } from '../../shared/crm-input/crm-input';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'crm-crm-users',
  imports: [FontAwesomeModule, AgGridAngular, CrmInput, RouterLink],
  templateUrl: './crm-users.html',
  styleUrl: './crm-users.scss',
})
export class CrmUsers {
  public readonly uploadIcon = faUpload;
  public readonly plusIcon = faPlus;
  public readonly searchIcon = faMagnifyingGlass;
  public userContent!: any;
  public searchConfig!: any;
  private myGridApi!: GridApi;
  public colDef!: ColDef[];

  public data = [
    {
      userId: 1,
      userName: 'Tarun Garg',
      mail: 'tarun@fake.com',
      assignments: 6,
      sitesAssigned: 12,
      metricsAssigned: 20,
      contact: 9876543210,
    },
  ];

  constructor(private _resource: Resource) {
    effect(() => {
      this.userContent = this._resource.content().users;
      this.searchConfig = {
        placeholder: this.userContent?.search,
        width: '402px',
        height: '38px',
        fontSize: '12px',
        icon: this.searchIcon,
      };
      this.defineColumns();
    });
  }

  private defineColumns() {
    this.colDef = [
      {
        field: 'userId',
        headerName: this.userContent.table.headers[0],
        filter: true,
        sort: 'desc',
      },
      {
        field: 'userName',
        headerName: this.userContent.table.headers[1],
        filter: true,
      },
      { field: 'mail', headerName: this.userContent.table.headers[2], filter: true },
      {
        field: 'assignments',
        headerName: this.userContent.table.headers[3],
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'sitesAssigned',
        headerName: this.userContent.table.headers[4],
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'metricsAssigned',
        headerName: this.userContent.table.headers[5],
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'contact',
        headerName: this.userContent.table.headers[6],
        filter: true,
        resizable: false,
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
