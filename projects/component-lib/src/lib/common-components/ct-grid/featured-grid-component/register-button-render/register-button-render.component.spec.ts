import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterButtonRenderComponent } from './register-button-render.component';

describe('RegisterButtonRenderComponent', () => {
  let component: RegisterButtonRenderComponent;
  let fixture: ComponentFixture<RegisterButtonRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterButtonRenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterButtonRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
