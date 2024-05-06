import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorAppointmentsComponent } from './tailor-appointments.component';

describe('TailorAppointmentsComponent', () => {
  let component: TailorAppointmentsComponent;
  let fixture: ComponentFixture<TailorAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TailorAppointmentsComponent]
    });
    fixture = TestBed.createComponent(TailorAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
