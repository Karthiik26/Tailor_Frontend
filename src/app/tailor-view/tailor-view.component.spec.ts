import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorViewComponent } from './tailor-view.component';

describe('TailorViewComponent', () => {
  let component: TailorViewComponent;
  let fixture: ComponentFixture<TailorViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TailorViewComponent]
    });
    fixture = TestBed.createComponent(TailorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
