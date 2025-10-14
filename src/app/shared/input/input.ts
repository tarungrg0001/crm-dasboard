import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'crm-input',
  templateUrl: 'input.html',
  styleUrls: ['input.scss'],
  imports: [FontAwesomeModule],
})
export class Input {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  public placeholder = input<string>();
  public iconName = input<IconDefinition>();
  public width = input<number>();
  public height = input<number>();

  public isActive = false;

  public activateInput() {
    this.isActive = true;
    setTimeout(() => this.input.nativeElement.focus(), 0);
  }

  public deactivateInput() {
    if (!this.input.nativeElement.value) {
      this.isActive = false;
    }
  }
}
