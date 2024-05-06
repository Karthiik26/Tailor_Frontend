import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorLoginComponent } from './tailor-login.component';

describe('TailorLoginComponent', () => {
  let component: TailorLoginComponent;
  let fixture: ComponentFixture<TailorLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TailorLoginComponent]
    });
    fixture = TestBed.createComponent(TailorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
