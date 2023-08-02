import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntPhoneComponentComponent } from './int-phone-component.component';

describe('IntPhoneComponentComponent', () => {
  let component: IntPhoneComponentComponent;
  let fixture: ComponentFixture<IntPhoneComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntPhoneComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntPhoneComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
