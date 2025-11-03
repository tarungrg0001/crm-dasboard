import { Component, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpload, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Resource } from '../../services/resource';
import { CrmInput } from '../../shared/crm-input/crm-input';
import { User } from '../../model/user';
import { getUsers } from '../../store/users/users.selector';

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

  public data!: User[];
  public userList$!: Observable<User[]>;

  constructor(private _resource: Resource, private _store: Store<{ users: User[] }>) {
    this.userList$ = _store.select(getUsers);
    this.userList$.subscribe((res) => {
      this.data = res;
    });
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
        field: 'id',
        headerName: this.userContent.table.headers[0],
        filter: true,
        sort: 'desc',
      },
      {
        field: 'name',
        headerName: this.userContent.table.headers[1],
        filter: true,
      },
      { field: 'email', headerName: this.userContent.table.headers[2], filter: true },
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
        field: 'mobile',
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
