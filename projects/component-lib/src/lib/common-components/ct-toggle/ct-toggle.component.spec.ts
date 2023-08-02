import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtToggleComponent } from './ct-toggle.component';

describe('CtToggleComponent', () => {
  let component: CtToggleComponent;
  let fixture: ComponentFixture<CtToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
