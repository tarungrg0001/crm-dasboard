import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmUser } from './crm-user';

describe('CrmUser', () => {
  let component: CrmUser;
  let fixture: ComponentFixture<CrmUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
