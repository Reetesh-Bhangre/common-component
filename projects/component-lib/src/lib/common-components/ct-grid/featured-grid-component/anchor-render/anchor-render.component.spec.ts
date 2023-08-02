import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorRenderComponent } from './anchor-render.component';

describe('AnchorRenderComponent', () => {
  let component: AnchorRenderComponent;
  let fixture: ComponentFixture<AnchorRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnchorRenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnchorRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
