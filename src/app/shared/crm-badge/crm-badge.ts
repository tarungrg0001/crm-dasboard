import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'crm-badge',
  templateUrl: 'crm-badge.html',
  imports: [CommonModule],
  styleUrls: ['crm-badge.scss'],
})
export class CrmBadge implements ICellRendererAngularComp {
  public type!: string;
  public status!: string;
  public list: string[] = [];

  constructor() {}

  public agInit(params: any): void {
    this.type = params.type;
    if (params.type === 'oval') {
      this.status = params.value;
    } else {
      this.list = params.value;
    }
  }

  public refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }
}
