import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmSites } from './crm-sites';

describe('CrmSites', () => {
  let component: CrmSites;
  let fixture: ComponentFixture<CrmSites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmSites]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmSites);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
