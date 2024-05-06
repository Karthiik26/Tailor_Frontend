import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorConfirmedAppointmentComponent } from './tailor-confirmed-appointment.component';

describe('TailorConfirmedAppointmentComponent', () => {
  let component: TailorConfirmedAppointmentComponent;
  let fixture: ComponentFixture<TailorConfirmedAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TailorConfirmedAppointmentComponent]
    });
    fixture = TestBed.createComponent(TailorConfirmedAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
