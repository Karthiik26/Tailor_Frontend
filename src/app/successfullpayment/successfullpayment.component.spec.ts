import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullpaymentComponent } from './successfullpayment.component';

describe('SuccessfullpaymentComponent', () => {
  let component: SuccessfullpaymentComponent;
  let fixture: ComponentFixture<SuccessfullpaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessfullpaymentComponent]
    });
    fixture = TestBed.createComponent(SuccessfullpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
