import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

  public getNewLanguageContent(langCode: string): void {
    this._http.get(`assets/languages/${langCode}.json`).subscribe((data) => {
      this.contentSignal.set(data);
    });
  }

  public exportToExcel(data: any, functionality: string) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${functionality}.xlsx`);
  }
}
