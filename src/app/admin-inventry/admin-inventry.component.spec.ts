import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInventryComponent } from './admin-inventry.component';

describe('AdminInventryComponent', () => {
  let component: AdminInventryComponent;
  let fixture: ComponentFixture<AdminInventryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminInventryComponent]
    });
    fixture = TestBed.createComponent(AdminInventryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
