import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorDesignPostComponent } from './tailor-design-post.component';

describe('TailorDesignPostComponent', () => {
  let component: TailorDesignPostComponent;
  let fixture: ComponentFixture<TailorDesignPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TailorDesignPostComponent]
    });
    fixture = TestBed.createComponent(TailorDesignPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
