import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'crm-crm-sites',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './crm-sites.html',
  styleUrl: './crm-sites.scss',
})
export class CrmSites {
  public readonly uploadIcon = faUpload;
  public readonly plusIcon = faPlus;
}
