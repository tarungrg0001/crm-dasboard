import { CommonModule } from '@angular/common';
import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'crm-input',
  templateUrl: 'crm-input.html',
  styleUrls: ['crm-input.scss'],
  imports: [FontAwesomeModule, CommonModule],
})
export class CrmInput {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  public placeholder = input<string>();
  public iconName = input<IconDefinition>();
  public width = input<string>();
  public height = input<string>();
  public fontSize = input<string>();

  public valueEmitter = output<string>();

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

  public filledValue(value: string) {
    this.valueEmitter.emit(value);
  }
}
