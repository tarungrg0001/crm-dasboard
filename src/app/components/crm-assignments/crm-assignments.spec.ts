import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmAssignments } from './crm-assignments';

describe('Assignments', () => {
  let component: CrmAssignments;
  let fixture: ComponentFixture<CrmAssignments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmAssignments],
    }).compileComponents();

    fixture = TestBed.createComponent(CrmAssignments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
