import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSaveMeasurementComponent } from './users-save-measurement.component';

describe('UsersSaveMeasurementComponent', () => {
  let component: UsersSaveMeasurementComponent;
  let fixture: ComponentFixture<UsersSaveMeasurementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersSaveMeasurementComponent]
    });
    fixture = TestBed.createComponent(UsersSaveMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
