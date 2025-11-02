import { Component, EventEmitter, input, Output, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'crm-modal',
  templateUrl: 'crm-modal.html',
  styleUrls: ['crm-modal.scss'],
  imports: [FontAwesomeModule],
})
export class CrmModal {
  public readonly closeIcon = faClose;
  public heading = input<string>();

  @Output() public buttonClicked: EventEmitter<'save' | 'cancel'> = new EventEmitter<
    'save' | 'cancel'
  >();

  constructor() {}
}
