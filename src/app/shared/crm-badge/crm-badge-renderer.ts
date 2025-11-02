import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NameInitials } from './name-initials.pipe';

@Component({
  selector: 'crm-badge-renderer',
  templateUrl: 'crm-badge.html',
  imports: [CommonModule, NameInitials],
  styleUrls: ['crm-badge.scss'],
})
export class CrmBadgeRenderer implements ICellRendererAngularComp {
  public type!: string;
  public status!: string;
  public list: string[] = [];
  public large = input<boolean>(false);

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
