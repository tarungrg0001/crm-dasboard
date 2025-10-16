import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmTable } from './crm-table';

describe('TailwindTable', () => {
  let component: CrmTable;
  let fixture: ComponentFixture<CrmTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmTable],
    }).compileComponents();

    fixture = TestBed.createComponent(CrmTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
