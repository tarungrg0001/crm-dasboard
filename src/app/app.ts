import { Component, signal } from '@angular/core';
import { CrmHeader } from './crm-header/crm-header';
import { LeftNav } from './left-nav/left-nav';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
