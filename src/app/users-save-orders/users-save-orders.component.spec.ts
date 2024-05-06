import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSaveOrdersComponent } from './users-save-orders.component';

describe('UsersSaveOrdersComponent', () => {
  let component: UsersSaveOrdersComponent;
  let fixture: ComponentFixture<UsersSaveOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersSaveOrdersComponent]
    });
    fixture = TestBed.createComponent(UsersSaveOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
