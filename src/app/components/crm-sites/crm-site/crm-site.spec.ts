import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmSite } from './crm-site';

describe('CrmSite', () => {
  let component: CrmSite;
  let fixture: ComponentFixture<CrmSite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmSite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmSite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
