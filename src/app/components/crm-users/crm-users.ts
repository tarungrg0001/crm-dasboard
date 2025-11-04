import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { CrmActionRenderer } from '../../shared/tables/crm-action-renderer/crm-action-renderer';
import { UserService } from '../../services/user/user';
import { CrmModal } from '../../shared/crm-modal/crm-modal';

@Component({
  selector: 'crm-crm-users',
  imports: [FontAwesomeModule, AgGridAngular, CrmInput, RouterLink, CrmModal],
  templateUrl: './crm-users.html',
  styleUrl: './crm-users.scss',
})
export class CrmUsers {
  public readonly uploadIcon = faUpload;
  public readonly plusIcon = faPlus;
  public readonly searchIcon = faMagnifyingGlass;
  public userContent!: any;
  public searchConfig!: any;
  public showDeleteModal = signal(false);
  public deleteId = signal<number>(0);
  public colDef!: ColDef[];
  private myGridApi!: GridApi;

  public data!: User[];
  public userList$!: Observable<User[]>;

  private _resource = inject(Resource);
  private _userService = inject(UserService);
  private _store = inject(Store<{ users: User[] }>);

  constructor() {
    this.getUsersList();
    effect(() => {
      this.initialize();
    });
  }

  private getUsersList() {
    this.userList$ = this._store.select(getUsers);
    this.userList$.subscribe((res) => {
      this.data = res;
    });
  }

  private initialize() {
    this.userContent = this._resource.content().users;
    this.searchConfig = {
      placeholder: this.userContent?.search,
      width: '402px',
      height: '38px',
      fontSize: '12px',
      icon: this.searchIcon,
    };
    this.defineColumns();
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
        field: 'contact',
        headerName: this.userContent.table.headers[6],
        filter: true,
        resizable: false,
      },
      {
        field: '',
        headerName: this.userContent.table.headers[7],
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

  public exportData() {
    this._resource.exportToExcel(this.data, 'users');
  }

  public deleteUser(id: number) {
    this.deleteId.set(id);
    this.showDeleteModal.set(true);
  }

  public closeModal(action: string) {
    if (action === 'delete') {
      this._userService.deleteUser(this.deleteId());
    }
    this.showDeleteModal.set(false);
  }
}
