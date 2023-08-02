import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagRenderComponent } from './tag-render.component';

describe('TagRenderComponent', () => {
  let component: TagRenderComponent;
  let fixture: ComponentFixture<TagRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagRenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
