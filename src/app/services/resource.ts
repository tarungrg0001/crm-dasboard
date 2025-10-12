import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Resource {
  private contentSignal = signal<any>(null);
  public readonly content = this.contentSignal.asReadonly();

  constructor(private _http: HttpClient) {}

  public getContent() {
    this._http.get('assets/languages/en.json').subscribe((data) => {
      this.contentSignal.set(data);
    });
  }

  public getNewLanguageContent() {
    this._http.get('assets/languages/de.json').subscribe((data) => {
      this.contentSignal.set(data);
    });
  }
}
