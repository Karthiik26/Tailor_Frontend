import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorIgProfileComponent } from './tailor-ig-profile.component';

describe('TailorIgProfileComponent', () => {
  let component: TailorIgProfileComponent;
  let fixture: ComponentFixture<TailorIgProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TailorIgProfileComponent]
    });
    fixture = TestBed.createComponent(TailorIgProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
