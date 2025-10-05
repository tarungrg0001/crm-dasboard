import { Component, signal } from '@angular/core';
import { CrmHeader } from './crm-header/crm-header';
import { LeftNav } from './left-nav/left-nav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CrmHeader, LeftNav, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('crm-dasboard');
}
