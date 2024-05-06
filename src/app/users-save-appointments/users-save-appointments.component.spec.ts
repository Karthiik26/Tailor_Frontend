import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSaveAppointmentsComponent } from './users-save-appointments.component';

describe('UsersSaveAppointmentsComponent', () => {
  let component: UsersSaveAppointmentsComponent;
  let fixture: ComponentFixture<UsersSaveAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersSaveAppointmentsComponent]
    });
    fixture = TestBed.createComponent(UsersSaveAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
