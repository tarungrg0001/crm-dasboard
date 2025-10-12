import { Component, signal } from '@angular/core';
import { CrmHeader } from './components/crm-header/crm-header';
import { LeftNav } from './components/left-nav/left-nav';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Resource } from './services/resource';

@Component({
  selector: 'app-root',
  imports: [CrmHeader, LeftNav, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  public isNavCollpased: boolean = false;
  protected readonly title = signal('crm-dasboard');
  public mode: string = 'light';

  constructor(public resource: Resource) {
    this.loadContent();
  }

  public loadContent() {
    this.resource.getContent();
  }

  public navValue(value: boolean) {
    this.isNavCollpased = value;
  }

  public changeTheme(mode: string) {
    if (mode === 'dark') {
      this.mode = 'dark';
    } else {
      this.mode = 'light';
    }
  }
}
