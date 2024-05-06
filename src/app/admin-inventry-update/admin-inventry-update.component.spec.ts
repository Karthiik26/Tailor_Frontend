import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInventryUpdateComponent } from './admin-inventry-update.component';

describe('AdminInventryUpdateComponent', () => {
  let component: AdminInventryUpdateComponent;
  let fixture: ComponentFixture<AdminInventryUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminInventryUpdateComponent]
    });
    fixture = TestBed.createComponent(AdminInventryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
