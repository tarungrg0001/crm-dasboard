import { CommonModule } from '@angular/common';
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
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './crm-dropdown.html',
  styleUrl: './crm-dropdown.scss',
})
export class CrmDropdown {
  @Output('action') private _action: EventEmitter<string> = new EventEmitter();

  public iconName = input<IconDefinition>();
  public options = input<any>();
  public buttonConfig = input<DropdownConfig>();

  public showOptions: boolean = false;
  public menuOutsideScreen: boolean = false;
  public readonly downArrow = faArrowDown;

  constructor(private el: ElementRef) {}

  public optionClicked(selectedValue: string | { name: string; code: string }) {
    this._action.emit(typeof selectedValue === 'string' ? selectedValue : selectedValue.code);
    this.showOptions = false;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: EventTarget | null) {
    if (!this.el.nativeElement.contains(target)) {
      this.showOptions = false;
    }
  }

  public onClick(button: HTMLElement) {
    this.menuOutsideScreen = false;
    const rect = button.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    if (rect.right + 30 > screenWidth) {
      this.menuOutsideScreen = true;
    }
    this.showOptions = !this.showOptions;
  }
}
