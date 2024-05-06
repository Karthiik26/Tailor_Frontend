import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTailorUpdateComponent } from './admin-tailor-update.component';

describe('AdminTailorUpdateComponent', () => {
  let component: AdminTailorUpdateComponent;
  let fixture: ComponentFixture<AdminTailorUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTailorUpdateComponent]
    });
    fixture = TestBed.createComponent(AdminTailorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
