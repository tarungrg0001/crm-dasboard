import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmUsers } from './crm-users';

describe('CrmUsers', () => {
  let component: CrmUsers;
  let fixture: ComponentFixture<CrmUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
