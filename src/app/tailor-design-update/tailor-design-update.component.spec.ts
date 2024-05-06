import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorDesignUpdateComponent } from './tailor-design-update.component';

describe('TailorDesignUpdateComponent', () => {
  let component: TailorDesignUpdateComponent;
  let fixture: ComponentFixture<TailorDesignUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TailorDesignUpdateComponent]
    });
    fixture = TestBed.createComponent(TailorDesignUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
