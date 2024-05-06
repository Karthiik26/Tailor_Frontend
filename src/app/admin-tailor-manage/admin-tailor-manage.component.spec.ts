import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTailorManageComponent } from './admin-tailor-manage.component';

describe('AdminTailorManageComponent', () => {
  let component: AdminTailorManageComponent;
  let fixture: ComponentFixture<AdminTailorManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTailorManageComponent]
    });
    fixture = TestBed.createComponent(AdminTailorManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
