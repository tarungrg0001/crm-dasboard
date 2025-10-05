import { Component, signal } from '@angular/core';
import { CrmHeader } from './crm-header/crm-header';

@Component({
  selector: 'app-root',
  imports: [CrmHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('crm-dasboard');
}
