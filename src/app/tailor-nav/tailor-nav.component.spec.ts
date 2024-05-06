import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorNavComponent } from './tailor-nav.component';

describe('TailorNavComponent', () => {
  let component: TailorNavComponent;
  let fixture: ComponentFixture<TailorNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TailorNavComponent]
    });
    fixture = TestBed.createComponent(TailorNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
