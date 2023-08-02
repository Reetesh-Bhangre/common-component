import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtFilterBarComponent } from './ct-filter-bar.component';

describe('CtFilterBarComponent', () => {
  let component: CtFilterBarComponent;
  let fixture: ComponentFixture<CtFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtFilterBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
