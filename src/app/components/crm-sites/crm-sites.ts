import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

import { CrmInput } from '../../shared/crm-input/crm-input';
import { Resource } from '../../core/services/resource';
import { Site } from '../../model/site';
import { SiteService } from '../../core/services/site';
import { CrmActionRenderer } from '../../shared/tables/crm-action-renderer/crm-action-renderer';
import { CrmModal } from '../../shared/crm-modal/crm-modal';

@Component({
  selector: 'crm-crm-sites',
  imports: [FontAwesomeModule, RouterLink, CrmInput, AgGridAngular, CommonModule],
  templateUrl: './crm-sites.html',
  styleUrl: './crm-sites.scss',
})
export class CrmSites {
  public readonly uploadIcon = faUpload;
  public readonly plusIcon = faPlus;

  public searchConfig: any;
  public sitesContent: any;
  public colDef!: ColDef[];
  public sitesList: Site[] = [];
  public showDeleteModal = signal<boolean>(false);

  private myGridApi!: GridApi;
  private deleteId = signal(0);
  private _resource = inject(Resource);
  private _sitesService = inject(SiteService);

  constructor() {
    this.setupSiteData();
    effect(() => {
      this.initialize();
    });
  }

  private setupSiteData() {
    this._sitesService.getSites().subscribe((res) => {
      this.sitesList = res;
    });
  }

  private initialize() {
    this.sitesContent = this._resource.content().sites;
    this.searchConfig = {
      placeholder: this.sitesContent?.search,
      width: '402px',
      height: '38px',
      fontSize: '12px',
      icon: faMagnifyingGlass,
    };
    this.defineColumns();
  }

  public onReady(event: GridReadyEvent): void {
    this.myGridApi = event.api;
    this.myGridApi.sizeColumnsToFit();
  }

  public searchValue(value: string): void {
    this.myGridApi.setGridOption('quickFilterText', value);
  }

  public exportData() {
    if (this.sitesList.length > 0) this._resource.exportToExcel(this.sitesList, 'sites');
  }

  public deleteUser(id: number) {
    this.deleteId.set(id);
    this.showDeleteModal.set(true);
  }

  public closeModal(action: string) {
    if (action === 'delete') {
      this._sitesService.deleteSite(this.deleteId());
    }
    this.showDeleteModal.set(false);
  }

  private defineColumns() {
    this.colDef = [
      {
        field: 'siteName',
        headerName: this.sitesContent.table.headers[0],
        filter: true,
      },
      {
        field: 'ownerName',
        headerName: this.sitesContent.table.headers[1],
        filter: true,
      },
      { field: 'email', headerName: this.sitesContent.table.headers[2], filter: true },

      {
        field: 'contact',
        headerName: this.sitesContent.table.headers[3],
        filter: true,
        resizable: false,
      },
      {
        field: 'organisation',
        headerName: this.sitesContent.table.headers[4],
        filter: true,
        tooltipField: 'organisation',
      },
      {
        field: '',
        headerName: this.sitesContent.table.headers[5],
        resizable: false,
        cellRenderer: CrmActionRenderer,
        cellRendererParams: { page: 'site' },
      },
    ];
  }
}
