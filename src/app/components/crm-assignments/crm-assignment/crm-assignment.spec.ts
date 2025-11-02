import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmAssignment } from './crm-assignment';

describe('CrmAssignment', () => {
  let component: CrmAssignment;
  let fixture: ComponentFixture<CrmAssignment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmAssignment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmAssignment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
