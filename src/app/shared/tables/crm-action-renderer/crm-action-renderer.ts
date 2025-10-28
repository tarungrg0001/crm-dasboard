import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'crm-action-renderer',
  templateUrl: 'crm-action-renderer.html',
  imports: [FontAwesomeModule],
  styleUrls: ['crm-action-renderer.scss'],
})
export class CrmActionRenderer implements ICellRendererAngularComp {
  public eyeIcon = faEye;
  public pencilIcon = faPencil;
  public garbageIcon = faTrash;

  public agInit(params: ICellRendererParams<any, any, any>): void {}

  public refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }
}
