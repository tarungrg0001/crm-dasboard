import { Component, input } from '@angular/core';
import { CrmInput } from '../../crm-input/crm-input';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { CrmDropdown } from '../../crm-dropdown/crm-dropdown';
import { faArrowDownShortWide, faFilter } from '@fortawesome/free-solid-svg-icons';

interface SearchConfig {
  placeholder: string;
  icon: IconDefinition;
  height: string;
  width: string;
  fontSize: string;
}

@Component({
  selector: 'crm-table',
  imports: [CrmInput, CrmDropdown],
  templateUrl: './crm-table.html',
  styleUrl: './crm-table.scss',
})
export class CrmTable {
  public readonly sortIcon = faArrowDownShortWide;
  public readonly filterIcon = faFilter;
  public searchConfig = input<SearchConfig>();
}
