import { Component, ElementRef, EventEmitter, HostListener, input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

interface DropdownConfig {
  iconName: IconDefinition;
  label: string;
}

@Component({
  selector: 'crm-dropdown',
  imports: [FontAwesomeModule],
  templateUrl: './crm-dropdown.html',
  styleUrl: './crm-dropdown.scss',
})
export class CrmDropdown {
  @Output('action') private _action: EventEmitter<string> = new EventEmitter();

  public iconName = input<IconDefinition>();
  public options = input<any>();
  public buttonConfig = input<DropdownConfig>();

  public showOptions: boolean = false;
  public readonly downArrow = faArrowDown;

  constructor(private el: ElementRef) {}

  public optionClicked(selectedValue: string | { name: string; code: string }) {
    this._action.emit(typeof selectedValue === 'string' ? selectedValue : selectedValue.code);
    this.showOptions;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: EventTarget | null) {
    if (!this.el.nativeElement.contains(target)) {
      this.showOptions = false;
    }
  }

  onClick() {
    this.showOptions = !this.showOptions;
  }
}
