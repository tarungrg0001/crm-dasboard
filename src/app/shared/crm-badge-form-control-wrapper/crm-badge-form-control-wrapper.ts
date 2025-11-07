import { Component, Input, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CrmBadge } from '../crm-badge/crm-badge';

@Component({
  selector: 'crm-badge-control',
  imports: [CrmBadge],
  template: `
    <crm-badge
      [badgeType]="badgeType()"
      [badgeStatus]="badgeStatus()"
      [badgeList]="badgeList()"
      [large]="large()"
    ></crm-badge>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CrmBadgeControlComponent),
      multi: true,
    },
  ],
})
export class CrmBadgeControlComponent implements ControlValueAccessor {
  public badgeType = input<'oval' | 'round'>();
  public large = input<boolean>(false);
  public badgeStatus = input<string>();
  public badgeList = input<string[]>([]);

  value: string | string[] | undefined;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  public writeValue(val: string) {
    this.value = val;
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
