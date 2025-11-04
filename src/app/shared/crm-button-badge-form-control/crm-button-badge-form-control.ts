import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'crm-button-badge',
  template: `
    @if(selectedValue()){
    <div class="neutral-badge">
      <span> {{ selectedValue() }} </span>
      <fa-icon [icon]="closeIcon" [size]="'xs'"></fa-icon>
    </div>
    }@else if ((selectedValues()?.length??0)>0){
    <div class="netrual-badges">
      @for(value of selectedValues(); track $index){
      <div class="neutral-badge">
        <span> {{ value }} </span>
        <fa-icon [icon]="closeIcon" [size]="'xs'"></fa-icon>
      </div>
      }
    </div>
    }
  `,
  styles: `
  
.netrual-badges {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

  .neutral-badge {
  border: 1px solid var(--color-border);
  height: 36px;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 12px;
  color: var(--color-neutral-500);

  fa-icon {
    margin-left: 17px;
  }
}
`,
  imports: [FontAwesomeModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CrmButtonBadgeControl),
      multi: true,
    },
  ],
})
export class CrmButtonBadgeControl implements ControlValueAccessor {
  public selectedValue = input<string>();
  public selectedValues = input<string[]>();
  public readonly closeIcon = faClose;
  public value: any;

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
