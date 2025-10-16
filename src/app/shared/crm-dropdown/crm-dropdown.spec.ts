import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmDropdown } from './crm-dropdown';

describe('Dropdown', () => {
  let component: CrmDropdown;
  let fixture: ComponentFixture<CrmDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(CrmDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
