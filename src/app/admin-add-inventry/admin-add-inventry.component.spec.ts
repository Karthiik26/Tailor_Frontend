import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddInventryComponent } from './admin-add-inventry.component';

describe('AdminAddInventryComponent', () => {
  let component: AdminAddInventryComponent;
  let fixture: ComponentFixture<AdminAddInventryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddInventryComponent]
    });
    fixture = TestBed.createComponent(AdminAddInventryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
