import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { RouterLink } from '@angular/router';

interface ActionCellRendererParams extends ICellRendererParams {
  page: string;
}

@Component({
  selector: 'crm-action-renderer',
  templateUrl: 'crm-action-renderer.html',
  imports: [FontAwesomeModule, RouterLink],
  styleUrls: ['crm-action-renderer.scss'],
})
export class CrmActionRenderer implements ICellRendererAngularComp {
  public eyeIcon = faEye;
  public pencilIcon = faPencil;
  public garbageIcon = faTrash;
  public id!: number;
  private params: any;
  public page!: string;

  public agInit(params: ActionCellRendererParams): void {
    this.params = params;
    this.id = params.data.id;
    this.page = params.page;
  }

  public refresh(params: ActionCellRendererParams): boolean {
    return true;
  }

  public delete() {
    this.params.context.componentParent.deleteUser(this.id);
  }
}
