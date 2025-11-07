import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { NameInitials } from './name-initials.pipe';

@Component({
  selector: 'crm-badge',
  templateUrl: 'crm-badge.html',
  imports: [CommonModule, NameInitials],
  styleUrls: ['crm-badge.scss'],
})
export class CrmBadge {
  public badgeType = input<'oval' | 'round'>();
  public badgeStatus = input<string>();
  public badgeList = input<string[]>([]);
  public large = input<boolean>(false);

  public type?: string;
  public tooltipContent?: string;
  public status?: string;
  public list: string[] = [];

  constructor() {
    effect(() => {
      this.type = this.badgeType();
      if (this.type === 'oval') {
        this.status = this.badgeStatus();
      } else {
        this.list = this.badgeList().slice(0, 3);
        if (this.badgeList()?.length > 3) {
          this.list.push(`+${this.badgeList().slice(3).length}`);
          this.tooltipContent = this.badgeList().slice(3).join(', ');
        }
      }
    });
  }
}
