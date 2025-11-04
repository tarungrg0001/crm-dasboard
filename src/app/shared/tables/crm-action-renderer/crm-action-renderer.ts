import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { RouterLink } from '@angular/router';

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

  public agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    this.id = params.data.id;
  }

  public refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  public delete() {
    this.params.context.componentParent.deleteUser(this.id);
  }
}
